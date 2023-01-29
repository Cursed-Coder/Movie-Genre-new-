const mongoose=require('mongoose')
const Joi=require("joi")
const number = require('joi/lib/types/number')
const { genreSchema, genreSchema2 } = require('./genres')

const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        // unique:true,
        minLength:3,
        maxLEngth:255
    },
    genres:{
        type:[genreSchema2],
        validate:{
            // async:true,
            validator:function(obj){
                return obj && obj.length>0
            },
            message:"Atleast add one genre"
        }
    },
    numberInStock:{
        type:Number,
        min:0,
        max:1024
    },
    dailyRentalCost:{
        type:Number,
        min:1,
        max:10000
    }
})

const Movie=mongoose.model("Movie",schema)

function validateMovie(movie){
    const schema={
        title:Joi.string().min(3).max(1024).required(),
        genres:Joi.array().items(Joi.objectId().required()),
        numberInStock:Joi.number().min(0).max(1024),
        dailyRentalCost:Joi.number().min(1).max(10000)

    }
    return Joi.validate(movie,schema);
}
exports.Movie=Movie
exports.validateMovie=validateMovie