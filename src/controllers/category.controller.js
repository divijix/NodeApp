import pool from "../config/DBconnection.js";
import * as validators from "../validators/category.validators.js"
import * as uploadUtil from "../utils/uplaodfile.js";


export async function getCategory(req,res){
    try{
        const query = `SELECT name, description, category_image_url FROM categories;`
        const result = await pool.query(query);
        res.status(200).json({...result.rows, message:"ok"});
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

        const ans = await uploadUtil.imageUplaod(req.file);
        const query = `
        INSERT INTO categories (name, description, category_image_url)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;
        const result = await pool.query(query,[isValid.name, isValid.description, ans.secure_url]);
        
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error('detailed error', JSON.stringify(err, null,2))
        console.log(`the error is ${err}`)
        res.status(500).json({message:"Internal Server Error from new category"});
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