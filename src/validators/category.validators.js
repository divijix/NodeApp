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