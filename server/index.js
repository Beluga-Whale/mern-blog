import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './database/db.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import commentRoute from './routes/commentRoute.js'
import authRoute from './routes/authRoute.js'
import morgan from 'morgan'


dotenv.config()
const PORT = process.env.PORT || 8800
const app = express()


mongoose.set('strictQuery', true)
ConnectDB()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong!"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})