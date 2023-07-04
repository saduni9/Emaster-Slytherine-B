var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports =  async function rate_course(req , res){
    // try{
    //     var validity = await validate_token(req , 2)
    //     console.log(validity)
    //     if (!validity.condition){
    //         res.send("not valid")
    //         return
    //     }
    // }
    // catch{
    //     console.log("catch")
    //     res.send("not valid")
    //     return
    // }
    try{
        connection.query("SELECT course_rate, rate_amount FROM course WHERE course_id = "+req.body.course_id, function (err, result, fields) {
            if (err) res.send(err);
            console.log("result",result)
            console.log(result[0].course_rate)
            const rate =  result[0].course_rate
            const rate_amount = result[0].rate_amount
            let new_rate_amount = rate_amount+1
            const new_rate =(rate * rate_amount + req.body.rate)/(new_rate_amount)
            console.log(new_rate)
            console.log(new_rate_amount)
            var sql = "UPDATE course "+"SET course_rate = "+new_rate+",rate_amount = "+new_rate_amount+" WHERE course_id = "+req.body.course_id
            connection.query(sql, function (err, result2, fields) {
            if (err) res.send(err);
            console.log(result2)
            res.send("success")
        });  
          });
}
catch{
    console.log("catch")
    res.send("not valid")
    return
}
}
