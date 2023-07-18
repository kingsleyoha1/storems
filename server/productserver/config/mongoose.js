const mongoose = require('mongoose')

const dbUrl = process.env.DB_CONNECT
const connectMongoose = async () => {
    try {
        console.log(dbUrl)
        await mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true});
        console.log('Connected to db')
    } catch (error) {
        console.log('error connecting to db', error)
    }
}

module.exports = connectMongoose