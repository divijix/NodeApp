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

function validDis(discription){
    if(!discription){
        return {err:"discription must be present"};
    }
    const news = discription.trim();
    return {discription:news}

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
    const discription = body?.discription;
    const url = body?.url;

    const newName = validName(name);
    if(newName.err){
        return {err:newName.err};
    }

    const newDiscription = validDis(discription); 
    if(newDiscription.err){
        return {err:newDiscription.err};
    }
    
    const newUrl = validUrl(url);
    if(newUrl.err){
        return {err:newUrl.err}
    }

    return {name:newName.name, discription: newDiscription.discription,url: newUrl.url};
}