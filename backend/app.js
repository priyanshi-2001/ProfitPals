import express from "express";
import cors from "cors"
import bcrypt from "bcrypt"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";

dotenv.config();
export const app = express();
app.set('view engine', 'ejs');
import cookieParser from 'cookie-parser';
app.use(cookieParser('keyforcookie'));
app.use(cors())
app.use(
  fileUpload({
      createParentPath: true,
  }),
);
import jwt from 'jwt-decode'
import {connectDB} from './db/conn.js'
connectDB()
import http from 'http';
const server = http.createServer(app);
import router from "./routes.js";
const port=8000
import bodyParser from "body-parser";
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(router);


server.listen(port,()=>{
    console.log(`connection is set up at ${port}`);

})

