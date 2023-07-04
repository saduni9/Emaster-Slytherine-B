var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_course(req , res){
    try{
        var validity = await validate_token(req , 1)
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
        connection.query("SELECT * FROM course", function (err, result, fields) {
            if (err) res.send(err);
            else{
                connection.query("SELECT * FROM user WHERE role='student'", function (err, result2, fields) {
                    if (err) res.send(err);
                    else{
                        connection.query("SELECT * FROM teacher", function (err, result3, fields) {
                            if (err) res.send(err);
                            else{
                        res.send({
                            totalCourses : result.length,
                            totalStudents : result2.length,
                            totalInstructors : result3.length,
                            totalUsers : result2.length + result3.length,
                            totalPayment : 200000
                        })  
                    }
                })  
            }
                })
            } 
          });
        
    }
    catch{
    console.log("catch")
    res.send("not valid")
    return
}
}