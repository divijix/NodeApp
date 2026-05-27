import {v2 as cloudinary } from 'cloudinary';
import config from '../config/config.js';


cloudinary.config({
    cloud_name: config.CL_CLOUD_NAME,
    api_key: config.CL_KEY,
    api_secret: config.CL_SECRET,
    secure: true
});


export async function imageUplaod(file){
    console.log(file.path);
    const result = await cloudinary.uploader.upload(file.path,{
        resource_type: 'auto',
    });
    console.log("file uploaded", result.secure_url);
    return result;
}