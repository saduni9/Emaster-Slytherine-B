const express = require('express')
const router = express.Router()
const commentCourse = require('../user/student/commentCourse')
const getCoursesByStudent = require('../user/student/getCoursesByStudent')
const likeCourse = require('../user/student/likeCourse')
const purchaseCourse = require('../user/student/purchaseCourse')
const rateCourse = require('../user/student/rateCourse')
const register = require('../user/student/register')
const removeStudent = require('../user/student/removeStudent')
const searchCourse = require('../user/student/searchCourse')
const updateStudent = require('../user/student/updateStudent')
const getOngoingCourses = require('../user/student/getOngoingCourses')
const getCourses = require('../user/student/getCourses')
const addCart = require('../user/student/addToCart')
const getCart = require('../user/student/getCart')
const removeCart = require('../user/student/removeCart')
const getCoursesById = require('../user/student/getCourseById')
const getCompletedCourses = require('../user/student/getCompletedCourses')
const unlikeCourse = require('../user/student/unlikeCourse')

router.post('/commentCourse' ,(req,res,next)=>{
    commentCourse(req , res)
})

router.get('/getCourse_student/:state' ,(req,res,next)=>{
    getCoursesByStudent(req , res)
})

router.put('/likeCourse/:course_id' ,(req,res,next)=>{
    likeCourse(req , res)
})

router.put('/unlikeCourse/:course_id' ,(req,res,next)=>{
    unlikeCourse(req , res)
})

router.get('/purchaseCourse/:courseId' ,(req,res,next)=>{
    purchaseCourse(req , res)
})

router.put('/rateCourse' ,(req,res,next)=>{
    rateCourse(req , res)
})

router.post('/registerStudent' ,(req,res,next)=>{
    register(req , res)
})

router.delete('/removeStudent' ,(req,res,next)=>{
    removeStudent(req , res)
})

router.get('/searchCourse/:key' ,(req,res,next)=>{
    searchCourse(req , res)
})

router.put('/updateStudent' ,(req,res,next)=>{
    updateStudent(req , res)
})

router.post('/addCart' ,(req,res,next)=>{
    addCart(req , res)
})

router.get('/getCart' ,(req,res,next)=>{
    getCart(req , res)
})

router.get('/getCourses' ,(req,res,next)=>{
    getCourses(req , res)
})

router.get('/getOngoingCourses' ,(req,res,next)=>{
    getOngoingCourses(req , res)
})

router.get('/getCompletedCourses' ,(req,res,next)=>{
    getCompletedCourses(req , res)
})

router.get('/getCourse_byID/:course_id' ,(req,res,next)=>{
    getCoursesById(req , res)
})

router.delete('/removeCart/:cart_id' ,(req,res,next)=>{
    removeCart(req , res)
})

module.exports = router