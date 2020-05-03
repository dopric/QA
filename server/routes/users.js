const express = require('express');
const { check, validationResult } = require('express-validator');
const bcryptjs =require('bcryptjs')
const {SALT} = require('../config/auth')
const router = express.Router()
const {authenticateUser} = require('../middlewares/auth')
const users = require('../config/dummydata')

const db = require('../db')
const UserModel = require('../models/user')


router.get('/', authenticateUser, (req, res)=>{
    const user = req.currentUser;
    console.log("Request made by the user", user.name)
    // UserModel.find({}, function(users){
        
    //     console.log(users)
    //       res.status(200).json(users)
    // })
    UserModel.find({})
    .then(users=>{
        var userMap = [];
        users.forEach(user=>{
            userMap.push({name: user.name, 
                createdDate: user.createdDate,
            updatedDate: user.updatedDate})
        })
        res.status(200).json(userMap)
    }).catch(err=>{
        console.log("Unable to get users", err)
    })
  
})

router.post('/',  [
    check('name')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "name"'),
    check('email')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "username"'),
    check('password')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "password"'),
  ],(req, res)=>{
    const errors = validationResult(req)
    console.log("ERRORS", errors)
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error =>error)
    // Return the validation errors to the client.
    return res.status(400).json({ errors: errorMessages });
    }
    console.log("Creating new user")
    const user = new UserModel({
        name: req.body.name,
        password: bcryptjs.hashSync(req.body.password),
        email: req.body.email
    })
    console.log("User")
    user.save().then(()=>{
        res.status(201).end()
    }).catch(err=>{
        console.log("User could not be saved", err)
        res.status(500).json({
            error: "User could not be saved"
        })
    })
})

module.exports = router;