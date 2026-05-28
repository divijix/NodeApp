function validName(name){
    if(!name){
        return {err:"wrong Name"};
    }
    name = name.trim();
    if(name.length > 100 || name.length === 0){
        return {err: "Name shoul be between 0 and 100 characters"};
    }
    return {name:name};
}

function validDis(description){
    if(!description){
        return {err:"description must be present"};
    }
    const news = description.trim();
    return {description:news}

}

function validUrl(url){
    if(!url){
        return {err:"url must be present"};
    }
    const news = url.trim();
    return {url:news};


}



export function validData(body){
    const name = body?.name;
    const description = body?.description;
    const url = body?.url;

    const newName = validName(name);
    if(newName.err){
        return {err:newName.err};
    }

    const newDescription = validDis(description); 
    if(newDescription.err){
        return {err:newDescription.err};
    }
    
    // const newUrl = validUrl(url);
    // if(newUrl.err){
    //     return {err:newUrl.err}
    // }

    return {name:newName.name, description: newDescription.description};
}

// -- For Inquiry -- 

function validateEmail(email) {
    const cleanEmail = typeof email === 'string' ? email.trim() : '';

    if (!cleanEmail) {
        return { err: 'Email is required and cannot be empty.' };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(cleanEmail)) {
        return { err: 'Invalid email format.' };
    }

    return { email: cleanEmail };
}

function validateMobile(mobile) {
    if(!mobile){
        return {err: "Moblie number is required"}
    }


    // Assuming the shortest number is at least of 4 digit 
    if(mobile.trim().length < 4){
        return {err: "Mobile number should be valid"};
    }
    mobile = mobile.trim();
    return { mobile: mobile }
}

function validateInquiry(inquiry) {
    if(!inquiry){
        return {err: "Inquiry is required"};
    }
    if(inquiry.trim().length < 5){
        return {err: "Inquiry Should be meaningfull"};
    }
    inquiry = inquiry.trim();

    return { inquiry: inquiry };
}

export async function validateInquiryData(data) {
    const {name, email, mobile, inquiry} = data;

    const newName = validName(name);
    if(newName.err){
        return {err:newName.err};
    }
    const newEmail = validateEmail(email);
    if(newEmail.err){
        return {err: newEmail.err};
    }
    const newMobile = validateMobile(mobile);
    if(newMobile.err){
        return {err: newMobile.err};
    }
    const newInquiry = validateInquiry(inquiry);
    if(newInquiry.err){
        return {err: newInquiry.err};
    }

    return {
        name: newName.name,
        email: newEmail.email,
        mobile: newMobile.mobile,
        inquiry: newInquiry.inquiry
    }
}