const router = require('express').Router()
const Records = require('../schema/records')
// const Drivers = require('../schema/driver')
// const Plows = require('../schema/plows')
// const Tractors = require('../schema/tractors')

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
    let start = req.query.start
    const records = await Records.find({userid}).sort({date:-1}).skip(start).limit(5)
    if(!records){
        res.status(404).json({msg:"no data"})
    }
    res.status(200).json(records)
})

router.get('/:id',async(req,res) => {
    const _id = req.params.id
    const record = await Records.findOne({_id})
    if(!record){
        res.status(404).json({msg: "record not found"})
    }
    res.status(200).json(record)
})

router.put('/:id',async(req,res) => {
    const _id = req.params.id
    const record = await Records.findOne({_id})
    if(!record){
        res.status(404).json({msg:"record not found"})
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

router.post('/user/:id/filter',async(req,res) => {
    const id = req.params.id
    const start=req.query.start
    let driver="",fromdate=null,todate=null
    driver=req.body.driver
    if(req.body.fromdate)
    {
        fromdate=req.body.fromdate
    }
    if(req.body.todate)
    {
        todate=req.body.todate
    }
    
    let records
    if(fromdate && todate)
    {
        records = await Records.find({userid:id,driver,date: {$gte: fromdate,$lte:todate}}).sort({date:-1}).skip(start).limit(5)
    }else if(fromdate)
    {
        records = await Records.find({userid:id,driver,date: {$gte: fromdate}}).sort({date:-1}).skip(start).limit(5)
    }else{
     records = await Records.find({userid:id,driver}).sort({date:-1}).skip(start).limit(5)
    }
     
    if(!records)
    {
        res.status(404).send({msg:"Not Found"})
    }
    res.status(200).json(records)
})

module.exports = router