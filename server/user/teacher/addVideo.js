var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_video(req , res){//export the add video function as a module 
    try{//validate the tocken send in the request using the validate function 
        var validity = await validate_token(req , 3)
        
        if (!validity.condition){//if tocken is not valid response "not valid"
            res.send("not valid")
            return
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
    try{//add video link to the database
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