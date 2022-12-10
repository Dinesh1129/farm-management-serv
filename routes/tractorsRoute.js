const router = require('express').Router()
const Tractors = require('../schema/tractors')

router.get('/',(req,res) => {
    res.status(200).send('hello')
})

router.post('/add',async (req,res) => {
    const tractor = await new Tractors(req.body)
    try {
        await tractor.save()
        res.status(201).json(tractor)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/user/:id',async(req,res) => {
    const id = req.params.id
    const tractors = await Tractors.find({userid:id})
    if(!tractors)
    {
        res.status(404).json({msg:'no tractors added'})
    }
    res.status(200).json(tractors)
})

router.get('/:id',async(req,res) => {
    const id = req.params.id
    const tractor = await Tractors.findOne({id})
    if(!tractor){
        res.status(404).json({msg:'not found'})
    }
    res.status(200).json(tractor)
})

router.put('/:id',async (req,res) => {
    const id = req.params.id
    const {name,registrationnumber,userid,company} = req.body
    const tractor = await Tractors.findOne({id})
    if(!tractor){
        res.status(404).json({msg:'not found'})
    }
    tractor.name = name
    tractor.userid = userid
    tractor.registrationnumber = registrationnumber
    tractor.company = company
    if(req.body?.model){
        tractor.model = req.body.model
    }
    if(req.body?.size){
        tractor.size = req.body.size
    }
    if(req.body?.color){
        tractor.color = req.body.color
    }
    try {
        await tractor.save()
        res.status(201).json(await Tractors.findOne({id}))
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',async (req,res) => {
    const id = req.params.id
    try {
        const tractor = await Tractors.findByIdAndDelete(id)
        res.status(200).json(tractor)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router