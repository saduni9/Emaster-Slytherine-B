// var connection = require('../../service/connection')
// var validate_token = require('../../authentication/authenticate')

// module.exports = async function update_teacher(req , res){
//     try{
//         var validity = await validate_token(req , 3)
        
//         if (!validity.condition){
//             res.send("not valid")
//             return
//         }
//     }
//     catch{
//         console.log("catch")
//         res.send("not valid")
//         return
//     }
//     try{
//         var sql = "UPDATE user " + "SET email = "+req.body.email+", name = "+req.body.name+", password = "+req.body.password+" WHERE user_id = "+validity.userId
//     connection.query(sql, function (err, result, fields) {
//         if (err) res.send(err);
//         else{
//             var sql = "UPDATE teacher " + "SET qualification = "+req.body.qualification+" WHERE user_id = "+validity.userId
//             connection.query(sql, function (err, result, fields) {
//                 if (err) res.send(err);
//                 else{
//                     res.send("success")
//                 }
//             });
//         }
//     });
//     }
//     catch{
//     console.log("catch")
//     res.send("not valid")
//     return
// }
// }