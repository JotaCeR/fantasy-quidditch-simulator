const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
require('dotenv').config()
const { DB_PASSWORD, DB_USERNAME } = process.env

const password = encodeURIComponent(DB_PASSWORD);

class DataBase {
    constructor (username, password) {
        this.uri = `mongodb+srv://${username}:${password}@cluster0.qdfvrf9.mongodb.net/?retryWrites=true&w=majority`;
        this.mongod = null;
        this.flag = ' ';
    }

    connectDB = async () => {
        try {
            if (process.env.NODE_ENV === 'test') {
                this.flag = ' |TESTING MODE| '
                this.mongod = await MongoMemoryServer.create()
                this.uri = this.mongod.getUri()
            }

            await mongoose.connect(this.uri, {
                autoIndex: false,
                useUnifiedTopology: true,
            })

            console.log(`%s Atlas MongoDB${this.flag}is connected`)
        } catch (e) {
            console.error(e)
            process.exit(1)
        }
    }

    disconnectDB = async () => {
        try {
            await mongoose.connection.close()
            if (this.mongod !== null) {
                await this.mongod.stop()
            }
            
            console.log(`%s Atlas MongoDB${this.flag}is disconnected`)
        } catch (e) {
            console.error(e)
            process.exit(1)
        }
    }
}

module.exports = { instance: new DataBase(DB_USERNAME, password) }