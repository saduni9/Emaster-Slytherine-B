var connection = require('../../service/connection')
const jwt = require('jsonwebtoken');
require('dotenv').config()


module.exports= async function resetPassword(req,res){
    const { id, token } = req.params; // Retrieve id and token from request parameters
    const { new_password } = req.body; // Retrieve password from request body
  
    console.log(id, token);
    console.log(new_password);
    
    try {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(verifyToken);
      
      if ( verifyToken.userId) {

        // Update the user's password in the database
        connection.query("update user set password='"+new_password+"' where user_id = '"+id+"'", function (err, result, fields) {
            if (err) res.send(err);
             else{
                res.status(200).json({
                    message: "Password updated successfully.Please login",
                  });
             }
        })

      } else {
        // If the token is invalid or does not have a userId property, send an unauthorized response
        res.status(401).json({ message: "Invalid user or token" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
}
