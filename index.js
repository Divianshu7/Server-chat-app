import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { readdirSync } from 'fs'
const app = express()
require('dotenv').config()
app.use(cors())
app.use(express.json())
const morgan = require("morgan");
app.use(morgan('dev'))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(() => console.log('connected DB')).catch((err) => console.log("error is ", err))

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))
const server = app.listen(process.env.PORT, () => {
    console.log(`Serverer Started on port ${process.env.PORT}`)
})