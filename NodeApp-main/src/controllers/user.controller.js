import pool from '../config/DBconnection.js'

export async function updateProflie(req,res){
    // here goes the update profile code

    try{            // tp do is validations on all of the json incoming
        const profile = req.body.profile;
        const id = req.user.userId;
        console.log(profile);
        console.log(id);

        const updateProflieQuery = `
        UPDATE users
        SET profile = $1
        WHERE id = $2
        RETURNING id, username, profile
        `;
        const values = [profile, id];
        const result = await pool.query(updateProflieQuery,values);
        res.status(200).json({message:"Profile Updated Successfully"});

    }catch(err){
        console.log(`error is ${err.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }    
}