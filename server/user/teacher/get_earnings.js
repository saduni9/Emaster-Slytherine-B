var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function get_courses(req , res){
    try{
        var validity = await validate_token(req , 3)
        
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
        var sql = "SELECT * FROM course WHERE teacher_id = "+validity.userId
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
            let course_ids = []
            for(let i=0; i<result.length; i++){
                course_ids.push(result[i].course_id)
            }
            var sql = "SELECT * FROM student_course"
            connection.query(sql, function (err, result2, fields) {
            if (err) res.send(err);
            else{
                let total_earning = 0
                for(let i=0; i<result2.length; i++){
                    if(course_ids.includes(result2[i].course_id)){
                        const index = result.findIndex(object => {
                            return object.course_id === result2[i].course_id;
                          });
                          total_earning+=parseInt(result[index].course_fee)
                    }
                }
                console.log(total_earning)
                res.send({
                    "totalEarnings":total_earning
                })
            }
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