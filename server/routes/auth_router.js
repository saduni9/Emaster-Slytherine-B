const express = require('express')
const router = express.Router()
var login = require('../user/public/login');
var validate_token = require('../user/public/validate_token')
var sendEmail = require('../user/public/sendEmail')

router.post('/login' ,(req,res,next)=>{
    login(req , res)
})

router.get('/validate/:api_no' ,async (req,res,next)=>{
    validate_token(req , res , req.params.api_no)
})

router.post('/sendEmail' ,(req,res,next)=>{
    sendEmail(req , res)
})


module.exports = router
