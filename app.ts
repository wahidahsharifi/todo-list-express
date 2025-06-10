import express from 'express';
import connectDB from './config/db';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express()

// load config
dotenv.config({ path: './config/config.env' })

// body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// connecting the DB
connectDB();

// routes
import indexRoutes from './routes/index.js';
app.use('/', indexRoutes)

// logging more stuff if in development mode with morgan
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

// making the app live
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode at port ${process.env.PORT}`))