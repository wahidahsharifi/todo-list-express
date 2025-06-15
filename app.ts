import express from 'express';
import connectDB from './config/db';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { patchSendFileRoot } from './config/patchSendFileRoot.js';

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Patch res.sendFile to use views as root by default
patchSendFileRoot(app);

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

// Serve static files from the public directory
app.use(express.static('public'))

// logging more stuff if in development mode with morgan
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

// making the app live
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode at port ${process.env.PORT}`))