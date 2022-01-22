import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            unique:true,
        },
        isAdmin:{
           type:Boolean,
           required:true,
           default:false
        },
    },
        {
            timestamps:true,
        }
    
);

userSchema.pre('save',async function(next){
   if (!this.isModified('password')){
       next();
   }

    this.password=await Genpassword(this.password);
})
async function Genpassword(password){
    const NO_OF_ROUNDS=10;
    const salt=await bcrypt.genSalt(NO_OF_ROUNDS);
    // console.log(salt);
    const hashedpassword=await bcrypt.hash(password,salt);
    // console.log(hashedpassword);
    return hashedpassword;
  }

  userSchema.methods.matchPassword=async function (enteredPassword){
      return await bcrypt.compare(enteredPassword,this.password);
  };
  

export const User=mongoose.model("User",userSchema,'login');
