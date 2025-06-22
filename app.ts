import express from 'express';
import connectDB from './config/db';
import morgan from 'morgan';
import dotenv from 'dotenv';
import indexRoutes from './routes/index.ts';
import todoRoutes from './routes/todo.ts'
import path from 'path';

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// load config
dotenv.config({ path: './config/config.env' })

// connecting the DB
connectDB();

// routes
app.use('/', indexRoutes)
app.use('/todo', todoRoutes)

// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(process.cwd(), 'views')));

// logging more stuff if in development mode with morgan
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

// making the app live
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode at port ${process.env.PORT}`))