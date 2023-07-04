var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports =async function gets_course_student(req , res){
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
      connection.query("SELECT course_id FROM student_course WHERE student_id = "+validity.userId+" AND state = '"+req.params.state+"'", function (err, result, fields) {
        if (err) res.send(err);
        connection.query("SELECT * FROM course", function (err, result2, fields) {
          if (err) res.send(err);
          let course_ids = []
          let response = []
          for(let i in result){
            let course = {
              course_id:result[i].course_id,
            }
            course_ids.push(course)
           }
          console.log(result2[0])
          for(let i in result2){
            console.log(result2[i].course_id)
            let index = course_ids.findIndex(item => item.course_id === result2[i].course_id) 
            if(index!=-1){
              let resp = {
                course:result2[i]
              }
              response.push(resp)
            }
          }  
          res.send(response)
        });   
      });
}
catch{
  console.log("catch")
  res.send("not valid")
  return
}
}