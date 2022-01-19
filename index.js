import express from "express";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {getById,deleteById,getByQuery,insertUsers} from "./helper.js";
import { usersRouter } from "./router/login.js";

dotenv.config();
const app=express();

app.use(express.json());
const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;
async function createConnection(){
 const client=new MongoClient(MONGO_URL);
 await client.connect();
 console.log("mongodb is connected");
 return client;
}
export const client=await createConnection();
app.get("/",(request,response)=>response.send("Hello world!!!"));

app.use("/users",usersRouter)



 async function Genpassword(password){
   const NO_OF_ROUNDS=4;
   const salt=await bcrypt.genSalt(NO_OF_ROUNDS);
   console.log(salt);
   const hashedpassword=await bcrypt.hash(password,salt);
   console.log(hashedpassword);
 }
 Genpassword("deepa");
app.listen(PORT,()=>console.log("connected in",PORT));