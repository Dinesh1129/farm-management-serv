const router = require('express').Router()
const Drivers = require('../schema/driver')

router.get('/',(req,res) => {
    res.status(200).send('working')
})

router.post('/add',async(req,res) => {
    const driver = new Drivers(req.body)
    try {
       await driver.save()
        res.status(201).json(driver)
    } catch (error) {
        res.status(500).json({err:error})
    }
})

router.get('/user/:id',async(req,res) => {
    const id = req.params.id
    // console.log(req.params)
    
    const drivers = await Drivers.find({userid:id})
    if(!drivers){
        res.status(404).json({msg:'no drivers added'})
    }
    res.status(200).json(drivers)
})

router.get('/:id',async(req,res) => {
    const _id = req.params.id
    // console.log(req.params)
    
    const driver = await Drivers.findOne({_id})
    if(!driver){
        res.status(404).json({msg:'driver not found'})
    }
    res.status(200).json(driver)
})

router.put('/:id',async(req,res) => {
    const _id = req.params.id
    const {name,license,userid,phone,email} = req.body
    const driver = await Drivers.findOne({_id})
    if(!driver)
    {
        res.status(404).json({msg:'driver not found'})
    }
    driver.name = name
    driver.phone = phone
    driver.email = email
    driver.license =license
    driver.userid = userid
    try {
       await driver.save()
       res.status(201).json(await Drivers.findOne({_id}))
    } catch (error) {
        res.status(500).json({msg:error})
    }
})

router.delete('/:id',async(req,res) => {
    const id = req.params.id;
    try {
        const driver = await Drivers.findByIdAndDelete(id)
        res.status(200).json(driver)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router