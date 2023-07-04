var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')
const { response } = require('express')

module.exports =async function gets_course_by_id(req , res){
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
    connection.query("SELECT * FROM course WHERE course_id = "+req.params.course_id, function (err, result, fields) {
        if (err) res.send(err)
        connection.query("SELECT * FROM course_video WHERE course_id = "+req.params.course_id, function (err, result2, fields) {
          if (err) res.send(err);
          let response = {
            course : result,
            videos : result2
          }
           res.send(response)
        });  
      });
}