var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function get_courses(req , res){
    try{
        var validity = await validate_token(req , 3)
        
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
        var sql = "SELECT * FROM course WHERE teacher_id = "+validity.userId
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
            res.send(result)
        }
        });
        
    }
    catch{
    console.log("catch")
    res.send("not valid")
    return
}
}