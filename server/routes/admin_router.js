const express = require('express')
const router = express.Router()
const deleteCourse = require('../user/admin/deleteCourse')
const removeVideo = require('../user/admin/removeVideo')
const suspendStudent = require('../user/admin/suspendStudent')
const updateCourse = require('../user/admin/updateCourse')
const getCourseStatics = require('../user/admin/getCourseStatics')
const getNumberOfCourses = require('../user/admin/getNumberOfCourses')
const getVideoStats = require('../user/admin/getVideoStats')

router.get('/stats/course_students/:courseId' ,(req,res,next)=>{
    getCourseStatics(req,res)
})

router.get('/stats/courses' ,(req,res,next)=>{
    getNumberOfCourses(req,res)
})

router.get('/stats/course_videos/:courseId' ,(req,res,next)=>{
    getVideoStats(req,res)
})

router.delete('/deleteCourse/:course_id' ,(req,res,next)=>{
    deleteCourse(req,res)
})

router.delete('/removeVedio/:video_id' ,(req,res,next)=>{
    removeVideo(req,res)
})

router.put('/suspendStudent/:user_id' ,(req,res,next)=>{
    suspendStudent(req,res)
})

router.put('/updateCourse/:course_id' ,(req,res,next)=>{
    updateCourse(req,res)
})


module.exports = router