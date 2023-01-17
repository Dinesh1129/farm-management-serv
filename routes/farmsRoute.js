const router = require('express').Router()
const Farms = require('../schema/farms')


router.get('/',(req,res) => {
    res.json({msg:'received'})
})

router.post('/add', async(req,res) => {
    const farm = await new Farms(req.body)
    try {
        await farm.save()
        res.status(201).json(farm)
    } catch (error) {
        res.status(500).json({msg:error})
    }
})

router.get('/user/:id', async(req,res) => {
    const id = req.params.id
    const farms = await Farms.find({userid:id})
    if(!farms){
        res.status(404).json({msg: "no farms added"})
    }
    res.status(200).json(farms)
})

router.get('/:id',async(req,res) => {
    const _id = req.params.id
    const farm = await Farms.findOne({_id})
    if(!farm){
        res.status(404).json({msg:'farm not found'})
    }
    res.status(200).json(farm)
})

router.put('/:id',async(req,res) => {
    const _id = req.params.id
    const {farmername,userid} = req.body
    const farm = await Farms.findOne({_id})
    if(!farm)
    {
        res.status(404).json({msg:'farm not found'})
    }
    farm.farmername = farmername
    farm.userid = userid
    if(req.body?.place){
        farm.place = req.body.place
    }

    try {
        await farm.save()
        res.status(201).json(await Farms.findOne({_id}))
    } catch (error) {
        res.status(500).json({msg:error})
    }
})

router.delete('/:id',async (req,res) =>{
    const id = req.params.id
    try {
        const farm = await Farms.findByIdAndDelete(id)
        res.status(200).json(farm)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router