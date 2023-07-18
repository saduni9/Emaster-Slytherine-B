
const jwt = require('jsonwebtoken');
const { resolve } = require('path');



const obj ={
    'api_access_list' : [
        {
            'api_no' : 1,
            'user_types' : ['admin']
        },
        {
            'api_no' : 2,
            'user_types' : ['student']
        },
        {
            'api_no' : 3,
            'user_types' : ['teacher']
        }
    ]
}
// Function to verify the token and check if the user is authorized
function verifyToken(){
    const availability = new Promise((resolve) => {
       const token = jwt.decode(token)
       connection.query("select * from user where username = '"+token.username+"'", function (err, result, fields) {
        if (err) res.send(err);
        if(token.password===result[0].password){
            return true
        }
        else{
            
            return false
        }
    })
    })
    return availability 
}
// Function to check if the API number and user type combination is authorized
async function check_authorization(api_no , user_type){
    var value = false
    console.log(api_no)
    const availability = new Promise((resolve) => {
        var newArray = obj.api_access_list.filter(function (el)
    { 
        if(el.api_no == api_no ){
            resolve(el.user_types.includes(user_type) ) 
            value = el.user_types.includes(user_type)
            return      
        }
    }
    );
    })
    return value 
}

async function getDecode(req){
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const response = new Promise((resolve) =>{
        try {
            const token = req.header(tokenHeaderKey);
            console.log("token",token)
            if (token == null){
                const response = {
                    "status" : "error",
                    "massage" : error,
                    "verified": false
                }
                resolve(response)
            }
        const verified = jwt.verify(token , jwtSecretKey)
        console.log("verified_data",verified)
        console.log(jwt.decode(token))
        if(verified){
            const response = {
                "status" : "success",
                "massage" : "verified",
                "verified": true,
                "token" : jwt.decode(token)
            }
            resolve(response);
        }else{
            console.log("error")
            const response = {
                "status" : "error",
                "massage" : error,
                "verified": false
            }
            resolve(response)
        }
    } catch (error) {
        console.log("catch")
        const response = {
            
            "status" : "error",
            "massage" : error,
            "verified": false
        }
        resolve(response);
    }
    })
    return response
}
// Main function to authenticate the user and check authorization for the API
module.exports =async function authenticate(req , api_no){
    const response =await getDecode(req)
    console.log(response)
    if(response.verified){
        var condition =await check_authorization(api_no , response.token.userType)
        console.log("condition ",condition)
        if(condition){
            return {
                "condition" : true,
                "userId" : response.token.userId
            }
        }
        else{
            return {
                "condition" : false,
                "userId" : null
            }
        }
    }
    return {
        "condition" : false,
        "userId" : null
    }
}