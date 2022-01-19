import {client} from "./index.js";
import { ObjectId } from "mongodb";
async function insertUsers(users) {
    return client
      .db("resetpassword")
      .collection("login")
      .insertMany(users);
  }
  async function updateUser(id,user){
    return client
      .db("resetpassword")
      .collection("login")
      .updateOne({_id:ObjectId(id)},{$set:user});
  }
  
  async function getByQuery(users) {
    return client
      .db("resetpassword")
      .collection("login")
      .find(users)
      .toArray();
  }
  
  async function deleteById(id) {
    return client
      .db("resetpassword")
      .collection("login")
      .deleteMany({ _id: ObjectId(id) });
  }
  
  async function getById(id) {
    return client
      .db("resetpassword")
      .collection("login")
      .findOne({ _id: ObjectId(id) });
  }

  export {getById,deleteById,getByQuery,insertUsers,updateUser} 