var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports =async function gets_course(req , res){
  try{
    var validity = await validate_token(req , 2)
    
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
    connection.query("SELECT * FROM course", function (err, result, fields) {
        if (err) res.send(err)
        connection.query("SELECT course_id FROM student_course WHERE state = 'complete' AND student_id = "+validity.userId, function (err, result2, fields) {
          if (err) res.send(err);
          let course_ids = []
          for(let i in result2){
            course_ids.push(result2[i].course_id)
           }
          let response = []
             for(let i in result){
              if(course_ids.includes(result[i].course_id)){
                response.push(result[i])
              }
             }
             connection.query("SELECT user_id , name FROM user", function (err, result3, fields) {
              if (err) res.send(err) 
              let techers = []
          for(let i in result3){
            techers.push(result3[i].user_id)
           }
           for(let i in response){
            if(techers.includes(response[i].teacher_id)){
              response[i].teacher_id
              response[i].teacher = result3.find(item => item.user_id===response[i].teacher_id)
              delete response[i].teacher_id
            }
           }
           res.send(response)
            })
        });  
      });
}