var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')
var removeCart = require('./removeCart')

module.exports = async function purchase_course(req , res){
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
    function format (date) {  
        if (!(date instanceof Date)){
          throw new Error('Invalid "date" argument. You must pass a date instance')
        }
      
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
      
        return `${year}-${month}-${day}`
      }
      try{
        var date = format(new Date)
        var sql = "SELECT * FROM cart WHERE course_id = "+req.params.courseId+" AND student_id = "+validity.userId
        connection.query(sql, function (err, result, fields){
        if (err) res.send(err);
        console.log(result)
        if(result.length!=0){
            var sql = "DELETE FROM cart WHERE cart_id = "+result[0].cart_id
        connection.query(sql, function (err, result2, fields) {
        if (err) res.send(err);
        var sql = "INSERT INTO student_course (date , course_id ,student_id ,state) " + "VALUES ('"+date+"',"+req.params.courseId+","+validity.userId+",'ongoing')"
        connection.query(sql, function (err, result3, fields) {
        if (err) res.send(err);
        res.send("success")
        });
        });
        }
        });
}
catch{
    console.log("catch")
    res.send("not valid")
    return
}
}
