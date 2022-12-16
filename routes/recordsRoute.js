const router = require('express').Router()
const Records = require('../schema/records')

router.get('/',(req,res) => {
    res.send('hello')
})

router.post('/add',async(req,res) => {
    const record = new Records(req.body)
    try {
        await record.save()
        res.status(201).json(record)
    } catch (error) {
        res.status(500).json({msg: error})
        console.log(`error : ${error}`)
    }
})

router.get('/user/:id',async(req,res) => {
    const userid = req.params.id
    const records = await Records.find({userid})
    if(!records){
        res.status(404).json({msg:"no data"})
    }
    res.status(200).json(records)
})

router.get('/:id',async(req,res) => {
    const id = req.params.id
    const record = await Records.findOne({id})
    if(!record){
        res.status(404).json({msg: "not found"})
    }
    res.status(200).json(record)
})

router.put('/:id',async(req,res) => {
    const id = req.params.id
    const record = await Records.findOne({id})
    if(!record){
        res.status(404).json({msg:"not found"})
    }
    const {farmer,place,driver,tractor,plow,totalhr,totalmin,hourlyrate,date,userid,totalamount} = req.body
    record.farmer = farmer
    record.userid = userid
    record.place = place
    record.driver = driver
    record.tractor = tractor
    record.plow = plow
    record.totalhr = totalhr
    record.totalmin = totalmin
    record.hourlyrate = hourlyrate
    record.date = date
    record.userid = userid
    record.totalamount=totalamount

    try {
        await record.save()
        res.status(201).json(record)
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:id',async(req,res) => {
    const id = req.params.id
    try {
        const record = await Records.findByIdAndDelete(id)
        res.status(200).json(record)
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports = router