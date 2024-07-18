import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));



app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())



////
import {userRouter} from './routes/user.route.js';
import { registerUser } from './controllers/user.controller.js';

app.use("/users",userRouter)

app.get("/hello",registerUser)


export {app}