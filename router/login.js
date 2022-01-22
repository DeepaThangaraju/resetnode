
import {getById,deleteById,getByQuery,updateUser,insertUsers} from "../helper.js";
import express from "express";
import { authUser, registeredUser } from "../usercontrols.js";
const router=express.Router();
router
.route("/:id").get(async(request,response)=>{
    const {id}=request.params;
    console.log(id);
    const user= await getById(id);
    user ?
   response.send(user):
   response.status(404).send({message:"user not found"});
 })
 .put(async(request,response)=>{
  const {id}=request.params;
  const user=request.body;
  console.log(id);
  const result= await updateUser(id,user);
  const updated=await getById(id);
  response.send(updated);
})
.delete(async(request,response)=>{
     const {id}=request.params;
     console.log(id);
     const user= await deleteById(id);
     user.deletedCount>0 ?
    response.send(user):
    response.status(404).send({message:"user not found"});
  })
  router
  .route("/").get(async(request,response)=>{
     const users=request.query;
     console.log(users);
     const user= await getByQuery(users);
     user ?
    response.send(user):
    response.status(404).send({message:"user not found"});
  })
  
  .post(registeredUser)

  router.route("/login").post(authUser);
    

  export const usersRouter=router;
 