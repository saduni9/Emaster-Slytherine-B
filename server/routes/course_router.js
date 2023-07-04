const express = require('express')
const router = express.Router()
const gets_course = require('../course/getCourses')

router.get('/getCourses' ,(req,res,next)=>{
    gets_course(req , res)
})


module.exports = router