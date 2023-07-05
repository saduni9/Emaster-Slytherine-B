var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')
var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lenzzhasthiyit@gmail.com",
      pass: "mfmpeqgzbjbxkcja",
    },
  });

module.exports = async function add_course(req , res){
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
        var sql = "INSERT INTO course (course_title , course_imgUrl, description ,course_fee,duration,teacher_id ,likes,rate_amount,course_rate) " + "VALUES ('"+req.body.course_title+"','"+req.body.course_imgUrl+"','"+req.body.description+"','"+req.body.course_fee+"','"+req.body.duration+"',"+validity.userId+",0,0,0)"
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        else{
           

            try{

             var sql = "SELECT email FROM user WHERE role = 'student'"
             connection.query(sql, function (err, result, fields) {
                 if (err) res.send(err);
                 else{ 
                     
                     for (var i=0;i<result.length;i++){
                         const mailOptions = {
                             from: "Emaster@gmail.com",
                             to: result[i].email,
                             subject: "<b>New Course Notification</b>",
                             text: `aded new course ${req.body.course_title}`
                             
                           };
                           transporter.sendMail(mailOptions, (error, info) => {
                             if (error) {
                               console.log("error", error);
                               res.status(201).json({ status: 201, message: "Email not send" });
                             } else {
                               console.log("Email sent", info.response);
                               res
                                 .status(201)
                                 .json({ status: 201, message: "Email sent succsfully" });
                             }
                           });
                     }
                     console.log("result",result)
                   
                 }
                 });

            }
            catch{
             console.log("catch")
             res.send("not valid")
           return

            }
     
         
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