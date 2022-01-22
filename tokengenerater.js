import jwt from 'jsonwebtoken';

const generateToken=(id)=>{
    return jwt.sign({id},process.env.ENV_SECRET,
        {
            expiresIn:"1hr",
        });
};

export {generateToken};