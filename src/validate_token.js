module.exports = function (token){
    try {
        token = decodeURIComponent(token);
        if (token.includes("Bearer")){
            if (token.indexOf("Bearer") != 0)
                return 0;
            token = token.replace(/^Bearer\s+/,"")
            token = token.split(".");
            token.pop();
            token.forEach((value,index)=>{
                value = new Buffer.from(value,"base64").toString();
                try {
                    value = JSON.parse(value);
                    if (index == 0){
                        if (!value.includes("type") || !value.includes("alg"))
                           return 0;
                    }
                    if (index == 1){
                        if (JSON.stringify(Object.keys(value)) != Object.values("iat","exp","nbf","jti","sub","prv"))
                            return 0;
                    }
                } catch(err){
                    return 0;
                }
            });
        } else {
            return 0;
        }
    } catch(error){
        return 0;
    };
    return 1;
}

