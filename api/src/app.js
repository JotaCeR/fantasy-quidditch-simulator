const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')

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

server.use('/', routes)

server.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || err
    console.error(err)
    return res.status(status).send(message)
})

module.exports = server