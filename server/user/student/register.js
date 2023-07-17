var connection = require('../../service/connection')

module.exports = async function register_student(req , res){
    try{
        console.log('hiiiiiiiiiiiiii')
        console.log(res.body)
        var sql = "INSERT INTO user (name , email ,password ,role,admin_status) " + "VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"','student',TRUE)"
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        });
        res.send("success")
}
catch{
    console.log("catch")
    res.send("not valid")
    return
}
}