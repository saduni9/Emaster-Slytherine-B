var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
const dotenv = require('dotenv');
const auth_router = require('./routes/auth_router')
const course_router = require('./routes/course_router')
const admin_router = require('./routes/admin_router')
const student_router = require('./routes/student_router')
const teacher_router = require('./routes/teacher_router')
var app = express();
dotenv.config();

app.use(cors())
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/auth',auth_router)
app.use('/api/course',course_router)
app.use('/api/admin',admin_router)
app.use('/api/student',student_router)
app.use('/api/teacher',teacher_router)

app.listen(process.env.PORT,()=>{
    console.log('server started in port : ',process.env.PORT)
})