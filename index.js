import express from "express";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
import {getById,deleteById,getByQuery,insertUsers} from "./helper.js";
import { usersRouter } from "./router/login.js";
import cors from 'cors';
import mongoose from 'mongoose';
import {connect} from "./connection.js";
import { errorHandler, notfound } from "./middleware/errormiddleware.js";
dotenv.config();
connect();
const app=express();
const PORT=process.env.PORT;
app.use(cors());
app.use(express.json());

const MONGO_URL=process.env.MONGO_URL;
// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   () => {
//     console.log('Connected to MongoDB');
//   }
// );
async function createConnection(){
 const client=new MongoClient(MONGO_URL);
 await client.connect();
 console.log("mongodb is connected");
 return client;
}
export const client=await createConnection();
app.get("/",(request,response)=>response.send("Hello world!!!"));

app.use("/users",usersRouter)

app.use(notfound);
app.use(errorHandler);

app.listen(PORT,()=>console.log("connected in",PORT));