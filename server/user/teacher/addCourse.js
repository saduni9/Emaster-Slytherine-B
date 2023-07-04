var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_course(req , res){
    try{
        var validity = await validate_token(req , 3)
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
        var sql = "INSERT INTO course (course_title , course_imgUrl, description ,course_fee,duration,teacher_id ,likes,rate_amount,course_rate) " + "VALUES ('"+req.body.course_title+"','"+req.body.course_imgUrl+"','"+req.body.description+"','"+req.body.course_fee+"','"+req.body.duration+"',"+validity.userId+",0,0,0)"
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