const amqp = require('amqplib')

require('dotenv').config()
const { AuthProduct, OrdProduct } = require('./models/Product')

async function consumeUserData() {
    const connection = await amqp.connect(process.env.AMQP_CONNNECT)
    const channel = await connection.createChannel();
 
    await channel.assertExchange('productExchange', 'fanout', {durable: false})

    const q = await channel.assertQueue('', { exclusive: true });
    console.log(q.queue)

    await channel.bindQueue(q.queue, 'productExchange', '');

    channel.consume(q.queue, async (msg) => {
        const content = JSON.parse(msg.content);
        const { type, data } = content.data;
        
        if(type == 'create') {
            await AuthProduct.create(data)
            console.log('shared with auth db')

            await OrdProduct.create(data)
            console.log('shared with order db')
        }

        channel.ack(msg)
    })
}
consumeUserData();