var connection = require('../../service/connection')
const jwt = require('jsonwebtoken');
require('dotenv').config()
var nodemailer = require("nodemailer");


module.exports=function sendEmail  (req,res)  {
    
        
       
      // Generate a token for password reset link
      
      //  sql query to get userID fromDB
      try{
        const email = req.body.email
        console.log(req.body)
        connection.query("select user_id from user where email = '"+email+"'", function (err, result, fields) {
        if (err) {
          return res.send(err);
        }
        else{
          if(result.length===0){
            return res.json({
              message:"user not found"
            })
          }
          
            console.log(result)
            const userId = result[0].user_id
            const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
                
              });
               // Construct the reset password link
            const resetPasswordLink = `http://localhost:3002/ResetPassword/${userId}/${token}`;
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  user: "codesfirstecom@gmail.com",
                  pass: "itghzohhnwnnscrs",
                },
              });
          
              const mailOptions = {
                from: "codesfirstecom@gmail.com",
                to:email ,
                subject: "Reset your password",
                html: `Please use following link to rest your password below.<br/>
                <b>Reset Password Link:<b/> ${resetPasswordLink}`,
              };
          
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                   return res.status(500).json({
                        error:"error in sending email"
                    })
                 
                  // Handle the error here, such as logging it or returning an error response
                } else {
                  

                  return res.status(200).json({
                    message:"Email sent succesfully"
                }) 
                  
                  // Handle the success case here, such as logging it or returning a success response
                }
              });
            
          
  

            

    

        }

        


      })

    }
      catch(error){
        return res.send(error)
      }


     
  
      
    } 