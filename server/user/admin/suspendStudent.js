var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function suspend_student(req , res){
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
        var sql = "UPDATE user " + "SET admin_status = False WHERE user_id = "+req.params.user_id
    connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
            res.send("success")
        }
    });
    }
    catch{
    console.log("catch")
    res.send("not valid")
    return
}
}