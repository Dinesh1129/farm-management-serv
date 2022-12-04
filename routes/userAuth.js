const router = require('express').Router()
const Registration = require('../schema/user')

router.get('/:id',(req,res) => {
    console.log(req.params)
    res.send('hello')
})

router.post('/register',async(req,res) => {
    const {email} = req.body
    const user = await Registration.findOne({email})
    console.log(user)
    if(user){
        res.send({msg:"user alreasy exists"})
        return
    }
    const newuser = new Registration(req.body)
    try {
        await newuser.save()
        res.json({msg:"success"})
    } catch (error) {
        res.json({err:error})
    }
})

router.post('/login',async(req,res) => {
    const {email,password} = req.body
   
    const user = await Registration.findOne({email})
    
    if(!user){
        res.send({msg:"user doesn't exists"})
        return
    }
    if(user.password == password){
        res.status(200).json(user)
    }else{
        res.status(403).json({msg:'wrong credentials'})
    }
})

module.exports = router