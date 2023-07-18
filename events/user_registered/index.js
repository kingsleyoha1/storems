const amqp = require('amqplib')

require('dotenv').config()
const { ProdUser, OrdUser } = require('./models/User')

async function consumeUserData() {
    const connection = await amqp.connect(process.env.AMQP_CONNNECT)
    const channel = await connection.createChannel();
 
    await channel.assertExchange('userExchange', 'fanout', {durable: false})

    const q = await channel.assertQueue('', { exclusive: true });
    console.log(q.queue)

    await channel.bindQueue(q.queue, 'userExchange', '');

    channel.consume(q.queue, async (msg) => {
        const data = JSON.parse(msg.content);

        await ProdUser.create(data.data)
        console.log('shared with product db')
        
        await OrdUser.create(data.data)
        console.log('shared with order db')
        // console.log(q.queue, data.data)
        channel.ack(msg)
    })
}
consumeUserData();