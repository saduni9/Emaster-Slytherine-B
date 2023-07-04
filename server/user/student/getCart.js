var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports =async function get_cart_student(req , res){
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
      connection.query("SELECT * FROM cart WHERE student_id = "+validity.userId,async function (err, result, fields) {
        if (err) res.send(err);
        connection.query("SELECT * FROM course", function (err, result2, fields) {
          if (err) res.send(err);
          let course_ids = []
          let response = []
          for(let i in result){
            let course = {
              course_id:result[i].course_id,
              cart_id:result[i].cart_id
            }
            course_ids.push(course)
           }
          console.log(result2[0])
          for(let i in result2){
            console.log(result2[i].course_id)
            let index = course_ids.findIndex(item => item.course_id === result2[i].course_id) 
            if(index!=-1){
              let resp = {
                cart_id:course_ids[index].cart_id,
                course:result2[i]
              }
              response.push(resp)
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
catch{
  console.log("catch")
  res.send("not valid")
  return
}
}