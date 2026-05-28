import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export async function verifyUser(req, res, next){
    const cookie = req.cookies?.uuid;

    console.log(cookie);

    if(!cookie){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const verified = jwt.verify(cookie, config.JWT_KEY);
        
        // passing the verified data to the req for the next middlewares
        req.user = verified;
        
        next();
    }catch(err){
        return res.status(403).json({message:"Invalid"});
    }

}

export function verifyAdmin(req,res,next){
    const cookie = req.cookies?.uuid;

    console.log(cookie);

    if(!cookie){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const verified = jwt.verify(cookie, config.JWT_KEY);
        if(verified.role !== 'admin'){
            return res.status(401).json({message:"Unauthorized"})
        }
        // passing the verified data to the req for the next middlewares
        req.user = verified;
        
        next();
    }catch(err){
        return res.status(403).json({message:"Invalid"});
    }

}