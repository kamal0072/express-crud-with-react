import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/connectDB.js'
import web from './routes/web.js';
import cors from 'cors';

const app = express();
//env file configuration...
dotenv.config()

//Taking port and DB Name from env file
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL;

//creating DB connetion
connectDB(DATABASE_URL);

app.use(express.json());

//cors for frontend.
app.use(cors());

//the base url for shop Controllers
app.use('/shop' , web)

app.listen(PORT, ()=>{
    console.log(`Development server start at : http://localhost:${PORT}`)
});
