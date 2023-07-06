var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports =  async function like_course(req , res){
    try{
        var validity = await validate_token(req , 2)
        
        if (!validity.condition){
            res.send("not valid")
            return
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
    try{
        connection.query("SELECT likes FROM course WHERE course_id = "+req.params.course_id, function (err, result, fields) {
            if (err) res.send(err);
            console.log(result[0].likes)
            const likes =  result[0].likes+1
            var sql = "UPDATE course "+"SET likes = "+likes+" WHERE course_id = "+req.params.course_id
            connection.query(sql, function (err, result, fields) {
            if (err) res.send(err);
            console.log(result)
            res.send("success")
        });  
          });
}
catch{
    console.log("catch")
    res.send("not valid")
    return
}
}
