var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')
var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({//nodemailer transporter 
    service: "gmail",
    auth: {
      user: "emasterslytherine@gmail.com",
      pass: "jiqvhesrxdbjppfe",
    },
  });

module.exports = async function add_course(req , res){
    try{
        var validity = await validate_token(req , 3)//validate the tocken sent in the request using validate tocken function
        console.log(validity)
        if (!validity.condition){//if the tocken is not valid send response of "not valid" and return from the function
            res.send("not valid")
            return
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
    try{//construct an SQL query string to insert new course in to DB
        var sql = "INSERT INTO course (course_title , course_imgUrl, description ,course_fee,duration,teacher_id ,likes,rate_amount,course_rate) " + "VALUES ('"+req.body.course_title+"','"+req.body.course_imgUrl+"','"+req.body.description+"','"+req.body.course_fee+"','"+req.body.duration+"',"+validity.userId+",0,0,0)"
        connection.query(sql, function (err, result, fields) {//execute the SQL query using the connection.quary method 
        if (err) res.send(err);
        else{
           

            try{
              //Quary the database to get the email address of all student

             var sql = "SELECT email FROM user WHERE role = 'student'"
             connection.query(sql, function (err, result, fields) {
                 if (err) res.send(err);
                 else{ 
                     //iterate over the result and send email notification to each student 
                     for (var i=0;i<result.length;i++){
                         const mailOptions = {
                             from: "emasterslytherine@gmail.com",
                             to: result[i].email,
                             subject: "New Course Notification",
                             html: `aded new course ${req.body.course_title}`
                             
                           };//send the email using the 'transforter.sendmail' method
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
                     
                   
                 }
                 });

            }
            catch{
             console.log("catch")
             res.send("not valid")
           return

            }
     
         
         res.send("success")//response success
     }
        });
        
    }
    catch{
    console.log("catch")
    res.send("not valid")
    return
}
}