var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function delete_course(req , res){
    try{
        var validity = await validate_token(req , 1)
        console.log(validity)
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
        var sql = "DELETE FROM course WHERE course_id = "+req.params.course_id
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
            var sql = "DELETE FROM course_video WHERE course_id = "+req.params.course_id
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
            res.send("success")
        }
        });
        }
        });
        
    }
    catch{
    console.log("catch")
    res.send("not valid")
    return
}
}