const router = require('express').Router()
const Registration = require('../schema/user')

router.get('/:id',(req,res) => {
    console.log(req.params)
    res.send('hello id')
})

router.post('/register',async(req,res) => {
    const {email} = req.body
    const user = await Registration.findOne({email})
    console.log(user)
    if(user){
        res.status(403).json({msg:"user alreasy exists"})
        return
    }
    const newuser = new Registration(req.body)
    try {
        await newuser.save()
        res.status(201).json({msg:"success"})
    } catch (error) {
        res.status(500).json({err:error})
    }
})

router.post('/login',async(req,res) => {
    const {email,password} = req.body
   
    const user = await Registration.findOne({email})
    
    if(!user){
        res.status(404).json({msg:`user doesn't exists`})
        return
    }
    if(user.password == password){
        res.status(200).json(user)
    }else{
        res.status(403).json({msg:'wrong credentials'})
    }
})

module.exports = router