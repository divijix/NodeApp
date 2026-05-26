import pool from "../config/DBconnection.js";
import * as validators from "../validators/category.validators.js"

export async function getCategory(req,res){
    try{
        const query = `SELECT * FROM categories;`
        const result = pool.query(query);
        res.status(200).json({...result, message:"ok"});
    }catch(err){
        console.log(`Some Error happened the error is---> ${err.message}`);
        res.status(400).json({message:"Internal Server Error"});
    }
}

export async function newCategory(req,res){
    try{
        const isValid = validators.validData(req.body);
        if(isValid.err){
            return res.status(400).json({message: isValid.err});
        }
        res.status(201).json({message:"new Category Created"});
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
}


export async function updateCategory(req,res){
    try{
        const isValid = validators.validData(req.body);
        if(isValid.err){
            return res.status(400).json({message:isValid.err});
        }
        res.status(200).json({message:"Category Updated"});
        
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
}