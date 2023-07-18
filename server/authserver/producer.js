const amqp = require('amqplib')
const config = require('./config/rabbitmq')

// Step 1 : Connect to the rabbitmq server
// Step 2 : Create a new cahnnel on that connection
// Step 3 : Create the exchange
// Step 4 : Publish the message to the exchange with a routing key

class Producer {
     channel;

    async createChannel() {
        const connection = await amqp.connect(config.rabbitMQ.url)
        this.channel = await connection.createChannel()
    }

    async publishMessage(routingKey, data) {
        if(!this.channel) {
            await this.createChannel()
        }

        const {exchangeName} = config.rabbitMQ
        await this.channel.assertExchange(exchangeName, 'fanout', {durable: false});

        const message = {routingKey, data}

        await this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)))

        console.log(`The new '${routingKey}' log is sent to exchange ${exchangeName}`)
    }
}

module.exports = Producer