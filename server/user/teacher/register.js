var connection = require('../../service/connection')

module.exports = async function register_student(req , res){
            console.log('hiiiiiiiiiiiiii')
            console.log(req.body)
        try{
            
            var sql = "INSERT INTO user (name , email ,password ,role,admin_status) " + "VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"','teacher',TRUE)"
            connection.query(sql, function (err, result, fields) {
            if (err) res.send(err);//insert value to database
            else{
                var sql = "INSERT INTO teacher (user_id , qualification) " + "VALUES ("+result.insertId+",'"+req.body.qualification+"')"
            connection.query(sql, function (err, result2, fields) {
            if (err) res.send(err);
            else{
                res.send("success")
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