const mongoose = require('mongoose')

const dbUrl = process.env.DB_CONNECT
const connectMongoose = async () => {
    try {
        await mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true});
        console.log('Connected to db')
    } catch (error) {
        console.log('error connecting to db', error)
    }
}

module.exports = connectMongoose