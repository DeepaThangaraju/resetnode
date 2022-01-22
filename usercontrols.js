import asyncHandler from 'express-async-handler';
import { User } from './models/usermodels.js';
import { generateToken } from './tokengenerater.js';

const registeredUser=asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body;

    const userExists=await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error("invalid credentials");
    }
    
        const user=await User.create(
            {
                name,
                email,
                password
            }
        );
        if(user){
            res.status(201).json(
                {
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    token : generateToken(user._id),
                }
            )
        }
        else{
            res.status(400)
            throw new Error("invalid credentials")
        }
   
})


const authUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json(
            {
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token : generateToken(user._id),
            }
        );
    }
    else{
        res.status(400)
        throw new Error("invalid user or password");
    }

   
})

export {registeredUser,authUser}