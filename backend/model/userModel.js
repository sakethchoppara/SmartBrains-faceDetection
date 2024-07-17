const {DataTypes, Sequelize, UUIDV4} = require('sequelize')
const {connection} = require('../database/connection')

const user = connection.define('user',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true,
        defaultValue:UUIDV4
    }
})


user.sync()


module.exports = user