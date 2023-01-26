const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId=require('joi-objectid')(Joi)
const {genreSchema}=require("./genres")
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  
  genres: {
    type: [genreSchema],
    validate: {
      validator: function (obj) {
        return obj && obj.length > 0;
      },
      message: "Please specify atleast one genre",
    },
  },
  dailyRentalCost: {
    type: Number,
    required: true,
    min: 5,
    max: 50,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 5,
    max: 50,
  },
});
const Movie = mongoose.model("Movie", schema);
function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).max(255).required(),
    genres:Joi.array().items(Joi.objectId().required()),
    dailyRentalCost: Joi.number().min(5).max(50).required(),
    numberInStock: Joi.number().min(5).max(50).required(),
  };
  return Joi.validate(movie, schema);
}
exports.Movie=Movie
exports.validate=validateMovie

// string id confusion prevention in routes
//where the message of validator goes actually
//min or max is a property of number not joi
//req.body.genres[genreId]
//if find by id  or even simple find methoddowsnot get ObjectID type it will tnot throw any error...rather it will typecast string to objectid
//tempGenre me error 404 wala code kaam nhi kr rha