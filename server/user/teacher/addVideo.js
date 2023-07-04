var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_video(req , res){
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
        var sql = "INSERT INTO course_video (video_link ,course_id ) " + "VALUES ('"+req.body.video_link+"',"+req.body.course_id+")"
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