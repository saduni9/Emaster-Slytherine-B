var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function update_student(req , res){
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
        var sql = "UPDATE course " + "SET course_title = '"+req.body.course_title+"', course_imgUrl = '"+req.body.course_imgUrl+"', description = '"+req.body.description+"', duration = '"+req.body.duration+"', course_fee = '"+req.body.course_fee+"', teacher_id = "+req.body.teacher_id+" WHERE course_id = "+req.params.course_id
    connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
            res.send("success")
        }
    });
    }
    catch{
    console.log("catch")
    res.send("not valid")
    return
}
}