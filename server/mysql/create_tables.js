var connection = require('../service/connection')

connection.query("CREATE TABLE course (course_id INT AUTO_INCREMENT PRIMARY KEY,  course_title VARCHAR(255) ,course_rate INT , rate_amount INT , course_imgUrl VARCHAR(255) , likes INT, description VARCHAR(255), duration VARCHAR(255), course_fee VARCHAR(255), teacher_id INT)", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

connection.query("CREATE TABLE course_video (id INT AUTO_INCREMENT PRIMARY KEY,  video_link VARCHAR(255), course_id INT)", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

connection.query("CREATE TABLE comment (comment_id INT AUTO_INCREMENT PRIMARY KEY ,comment VARCHAR(255) , student_id INT,course_id INT)", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

connection.query("CREATE TABLE student_course (sc_id INT AUTO_INCREMENT PRIMARY KEY,  date VARCHAR(255) ,student_id INT , course_id INT ,state VARCHAR(255))", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

connection.query("CREATE TABLE user (user_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),password VARCHAR(255) , email VARCHAR(255),role VARCHAR(255) , admin_status BOOLEAN)", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

connection.query("CREATE TABLE teacher (user_id INT PRIMARY KEY, qualification VARCHAR(255))", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

connection.query("CREATE TABLE feature (id INT AUTO_INCREMENT PRIMARY KEY, feature VARCHAR(255), course_id INT)", function (err, result, fields) {
  if (err) throw err;
    console.log(result);
  });

  connection.query("CREATE TABLE cart (cart_id INT AUTO_INCREMENT PRIMARY KEY,student_id INT , course_id INT )", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });