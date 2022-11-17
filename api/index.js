require('dotenv').config()
const database = require('./src/database.js')
const server = require('./src/app.js')
const port = process.env.PORT || 3001

console.log(server)
server.listen(port, () => {
    console.log(`%s listening at ${port}`)
})
.then(() => database.instance.connectDB())
.then(() => console.log('%s Everything is working smoothly...'))