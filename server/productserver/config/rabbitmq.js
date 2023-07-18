require('dotenv').config()

module.exports = {
    rabbitMQ: {
        url: process.env.AMQP_BASE,
        exchangeName: 'storeExchange'
    }
}