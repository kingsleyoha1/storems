const amqp = require('amqplib')
const config = require('./config/rabbitmq')

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