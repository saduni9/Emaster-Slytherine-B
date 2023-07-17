const express = require('express')
const router = express.Router()
const updateTeacher = require('../user/teacher/updateTeacher')
const register = require('../user/teacher/register')
const removeTeacher = require('../user/teacher/removeTeacher')
const addCourse = require('../user/teacher/addCourse')
const addVideo = require('../user/teacher/addVideo')
const getCourses = require('../user/teacher/getCourses')
const get_earnings = require('../user/teacher/get_earnings')
const getCourses_amount = require('../user/teacher/getCourses_amount')
// const { get } = require('./student_router')

router.post('/register' ,(req,res,next)=>{
    console.log('registerrrrrrrrrrrrr')
  
    register(req , res)
})

router.put('/updateTeacher' ,(req,res,next)=>{
    updateTeacher(req , res)
})

router.delete('/removeTeacher' ,(req,res,next)=>{
    removeTeacher(req , res)
})

router.post('/addCourse' ,(req,res,next)=>{
    addCourse(req,res)
})

router.post('/addVideo' ,(req,res,next)=>{
    addVideo(req,res)
})

router.get('/getCourses' ,(req,res,next)=>{
    getCourses(req,res)
})

router.get('/getEarnings' ,(req,res,next)=>{
    get_earnings(req,res)
})

router.get('/getCoursesAmount' ,(req,res,next)=>{
    getCourses_amount(req,res)
})
module.exports = router

