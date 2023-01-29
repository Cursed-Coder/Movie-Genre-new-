const { validateGenre, Genre } = require('../models/genres')

const router=require('express').Router()


router.post("/",async(req,res)=>{
    const {error}=validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const genre=new Genre({
        name:req.body.name
    })
    try{
     await genre.save();
    }
    catch(error){
        const err=[]
        for(field in error.errors){
            err.push(error.errors[field])
        }
        res.send(err)
    }
    return res.send(genre)


    
})
router.get("",async(req,res)=>{})
router.get("",async(req,res)=>{})
router.put("",async(req,res)=>{})
router.delete("",async(req,res)=>{})

module.exports.genreRouter=router