var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function remove_student(req , res){//this should be remove cart
    try{
        var validity = await validate_token(req , 2)
        
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
        var sql = "DELETE FROM cart WHERE cart_id = "+req.params.cart_id
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