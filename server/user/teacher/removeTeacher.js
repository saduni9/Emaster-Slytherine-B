var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function purchase_course(req , res){
    try{
        var validity = await validate_token(req , 3)
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
            var sql = "DELETE FROM user WHERE user_id = "+validity.userId
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
            var sql = "DELETE FROM teacher WHERE user_id = "+validity.userId
        connection.query(sql, function (err, result, fields) {
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