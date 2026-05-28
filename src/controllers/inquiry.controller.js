import * as generalValidators from '../validators/general.validators.js'

export async function inquiryPost(req,res) {
    const result = generalValidators.validateInquiryData(req.body);
    if(result.err){
        return {message: err};
    }
    const {name, email, mobile, inquiry} = result;

    // now save this in the server and send back the inqiry again with 200 code

    res.status(200).json({...result, message:"Still have to connect with the DB"});
}

export async function inquiryGet(req,res) {
    if(req.user.role !== 'admin'){
        return res.status(401).json({message:"Unauthorized"});
    }
    // now make the call to the db and get all the inquires

    res.status(200).json({message:"Still have to connect with the DB but Authroization works"});
}