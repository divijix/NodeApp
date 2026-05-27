import pool from "../config/DBconnection.js";

export async function getProducts(req,res){
    try{
        const query = `SELECT * FROM products;`
        const products = await pool.query(query);
        res.status(200).json({...products.rows,message:"Products"});
    }catch(err){
        console.log(`Some error happened ${err.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
}