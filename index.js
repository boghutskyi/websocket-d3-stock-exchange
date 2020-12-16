const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const option = {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
}
const io = require('socket.io')(server, option)

const config = require('config')

app.use(cors())

const PORT = config.get('PORT') || 5000

io.on('connection', async socket => {
    try {
        console.log(socket.id)
        // const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=aapl&interval=5min&apikey=CE1U4BF8HLQY479I')
        // const data = await response.json()
        io.emit('data', data)
        socket.on('message', data => {
            console.log(data)
        })
    } catch (e) {

    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})