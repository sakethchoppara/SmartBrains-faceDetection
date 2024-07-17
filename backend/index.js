const express = require('express');
const server = express()
const cors = require('cors')
const {testConnection} = require('./database/connection')
const {router} = require('./api/routes')

server.use(cors())
server.use(express.json())
server.use(express.urlencoded())
server.use('/api',router)

testConnection()


server.get('/',(req,res)=>{
    res.send('online')
})






server.listen('8000')