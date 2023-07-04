var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_course(req , res){
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
        var sql = "SELECT * FROM student_course WHERE course_id = "+req.params.courseId
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
            res.send({
                totalStudents : result.length
            })
        }
        });
        
    }
    catch{
    console.log("catch")
    res.send("not valid")
    return
}
}