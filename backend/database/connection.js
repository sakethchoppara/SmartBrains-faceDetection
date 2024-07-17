const {Sequelize} = require('sequelize');
require('dotenv').config()

const user = process.env.DBUSER
const pass = process.env.DBPASS
const host = process.env.DBHOST
const db = process.env.DB



const connection = new Sequelize(db,user,pass,{
    host:host,
    dialect:'postgres'
})


const testConnection = async()=>{
    try {
        await connection.authenticate();
        console.log('connection established')
    } catch (error) {
        console.log(`error at connection ${error}`)
    }
}



module.exports = {
    connection,
    testConnection
}