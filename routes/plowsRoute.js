const router = require('express').Router()
const Plows = require('../schema/plows')

router.get('/',(req,res) => {
    res.status(200).send('hello')
})

router.post('/add',async(req,res) => {
    const plow = await new Plows(req.body)
    try {
        await plow.save()
        res.status(201).json(plow)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/user/:id',async(req,res) => {
    const id = req.params.id
    const plows = await Plows.find({userid:id})
    if(!plows){
        res.status(404).json({msg: "no plows added"})
    }
    res.status(200).json(plows)
})

router.get('/:id',async(req,res) => {
    const _id = req.params.id
    const plow = await Plows.findOne({_id})
    if(!plow){
        res.status(404).json({msg:'plow not found'})
    }
    res.status(200).json(plow)
})

router.put('/:id',async(req,res) => {
    const _id = req.params.id
    const {name,userid} = req.body
    const plow = await Plows.findOne({_id})
    if(!plow)
    {
        res.status(404).json({msg:'plow not found'})
    }
    plow.name = name
    plow.userid = userid
    if(req.body?.type){
        plow.type = req.body.type
    }

    try {
        await plow.save()
        res.status(201).json(await Plows.findOne({_id}))
    } catch (error) {
        res.status(500).json({msg:error})
    }
})

router.delete('/:id',async (req,res) =>{
    const id = req.params.id
    try {
        const plow = await Plows.findByIdAndDelete(id)
        res.status(200).json(plow)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router