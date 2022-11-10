require('dotenv').config()
require('./src/database.js')
const server = require('./src/app.js')
const port = process.env.PORT || 3001

server.listen(port, () => {
    console.log(`%s listening at ${port}`)
})