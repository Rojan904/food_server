import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// const colors=require('colors');
import { connectDB } from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import restaurantRoute from './routes/restaurantRoute.js';
import testRoute from './routes/testRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config(); //if you need to specify path do it in culry brace as config({path:"./"});

//db connection
connectDB();
//object
const app=express();

//cors is itseld a middleware which runs before
app.use(cors());
app.use(express.json()); //accepting client data in json format
app.use(morgan('dev'));
//route
app.use('/api/v1/test',testRoute);
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/restaurant', restaurantRoute)
app.use('/api/v1/category', categoryRoute)



//url: http:localhost:8080
//has a callback that handles req and res methods
app.get('/', (req,res)=>{
return res.status(200).send('<h1>Welcome</h1>');
});

//port
const PORT=process.env.PORT || 3000; //using port of .env

//listen to defied port
app.listen(PORT ||3030, ()=>{
    console.log(colors.white.bgMagenta(`Server running at ${PORT}`));
})