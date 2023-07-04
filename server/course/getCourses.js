var connection = require('../service/connection')
var validate_token = require('../authentication/authenticate')

module.exports =async function gets_course(req , res){
    connection.query("SELECT * FROM course", function (err, result, fields) {
        if (err) res.send(err)
        connection.query("SELECT course_id FROM student_course WHERE student_id = "+validity.userId, function (err, result2, fields) {
          if (err) res.send(err);
          let response = []
             for(let i in result){
              if(!result2.includes(result[i])){
                response.push(result[i])
              }
             }
             res.send(response)
        });  
      });
}