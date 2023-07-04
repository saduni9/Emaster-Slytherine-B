var connection = require('../../service/connection')
var generate_token = require('../../authentication/generate_token')

module.exports = function login(req , res){
    try{
        console.log(req.body)
    connection.query("select * from user where email = '"+req.body.email+"'", function (err, result, fields) {
        if (err) res.send(err);
        else{
            if(result.length===0){
                res.send("error username or password")
            }
            else{
            if(req.body.password===result[0].password){
                const token = generate_token(result[0].user_id , result[0].role,result[0].email,result[0].password)
                res.send({
                    token:token,
                    role:result[0].role
                })
            }
            else{
                res.send("error username or password")
            } 
        }
        }  
      });
    }
    catch{
        res.send("error username or password")
    }
}