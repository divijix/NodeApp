import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import USER from "../models/user.model.js"
import * as authUtils from "../utils/auth.utils.js"


export async function registerUser(req, res){
    try{
        const {username, email, password} = req.body;

        // Validations go here ----> 

        const validData = authUtils.validateDataReg(req.body);
        if(!validData){
            return res.status(400).json({message:"wrong input values"})
        }


        const isPresent = await USER.findOne({email: email})
        if(isPresent){
            return res.status(409).json({message:"Email already exists"});
        }


        const hashedPassword = await authUtils.hashPassword(password);

        const save = {
            username:username,
            email:email,
            password:hashedPassword
        }

        const newUser = await USER.create(save);

        const tokenData ={
            userId: newUser._id,
            username: newUser.username
        }
        const token = authUtils.generateToken(tokenData);

        res.cookie('uuid', token,{
            sameSite:'none',
            httpOnly:true,
        })
        res.status(201).json({message:"account created"});

    }catch(err){
        console.log(`Some error happened-> ${err.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }


}

export async function loginUser(req, res){
    try{
         const {email, password} = req.body;
        // validate the data

        const validData = authUtils.validateDataLogin(req.body);
        if(!validData){
            return res.status(400).json({message:"Invalid Input Data"});
        }

        // if the data is validated
        const findUser = await USER.findOne({email:email});
        if(!findUser){
            return res.status(400).json({message:'User user found'});
        }

        const compare = await authUtils.comparePass(password, findUser.password);
        if(!compare){
            return res.status(409).json({message:'Incorrect password'});
        }

        const tokenData = {
            userId: findUser._id,
            username: findUser.username
        }

        const token = authUtils.generateToken(tokenData);

        res.cookie('uuid',token,{
            sameSite:'none',
            httpOnly:true
        });
        res.status(200).json({messagae:"login successful"});
    }catch(err){
        console.log(`Some error happened--> ${err.message}`);
        res.status(500).json({message:"Internal Server Error"})
    }
}