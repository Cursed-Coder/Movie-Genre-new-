const mongoose=require('mongoose')
const Joi=require("joi")

const schema=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        maxLength:1024,
        unique:true,
        required:true
    }
})
const schema2=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        maxLength:1024,
        // unique:true,
        required:true
    }
})

const Genre=mongoose.model("Genre",schema)


function validateGenre(genre){
    const schema={
        name:Joi.string().min(3).max(1024)
    }
    return Joi.validate(genre,schema);
}
exports.Genre=Genre
exports.validateGenre=validateGenre
exports.genreSchema=schema
exports.genreSchema2=schema2