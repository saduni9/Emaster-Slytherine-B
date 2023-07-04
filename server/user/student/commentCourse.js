var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function comment_course(req , res){
    try{
        var validity = await validate_token(req , 2)
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
        var sql = "INSERT INTO comment (comment , student_id , course_id) " + "VALUES ('"+req.body.comment+"',"+validity.userId+","+req.body.course_id+")"
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        });
        res.send("success")
}
catch{
    console.log("catch")
    res.send("not valid")
    return
}
}
