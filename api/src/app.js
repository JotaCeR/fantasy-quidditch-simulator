const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const routes = require('./routes/index.js')

const server = express();

server.name = 'FQS — API'

server.use(express.json())
server.use(
    express.urlencoded({
        extended: true
    })
)
server.use(morgan('dev'))
server.use(cors())

// server.use('/', routes)
server.use('/', (req, res) => {
    try {
        console.log("Hello World!")
        res.status(200).json({message: 'Success'})
    } catch (e) {
        const message = e.message || e
        console.error(e)
        res.status(400).send(message) 
    }
})

server.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || err
    console.error(err)
    return res.status(status).send(message)
})

module.exports = server