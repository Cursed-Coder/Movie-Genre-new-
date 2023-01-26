const router = require("express").Router();
const {Movie,validate}=require('../models/movies')
const {Genre}=require("../models/genres")
router.get("/", async (req, res) => {
  const result = await Movie.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("movie not found");
  }
  res.send(movie);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // console.log(req.body.genres)
  const genres = [];
  for (idx in req.body.genres) {
    const genreId=req.body.genres[idx]
    // console.log("Here")
    console.log(genreId)
    const tempGenre = await Genre.findById(genreId)
    console.log(tempGenre)
    if (!tempGenre)
      return res.status(404).send(`Genre with id ${genreId} not found`);
    const genre = new Genre({
    });
    console.log(`TEMPGENRE ID IS ${tempGenre._doc._id}`)
    genre._doc._id=tempGenre._doc._id
    genre._doc.name=tempGenre._doc.name
    // console.log(genre)
    genres.push(genre);
  }
 
  const movie = new Movie({
    title: req.body.title,
    genres: genres,
    dailyRentalCost: req.body.dailyRentalCost,
    numberInStock: req.body.numberInStock,
  });
  errors = [];
  try {
    const result = await movie.save();
    return res.send(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
      errors.push(ex.errors[field].message);
    }
    return res.send(errors);
  }
});

router.put("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("movie not found");
  }
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  movie.set({ _title: req.body.title });
  await movie.save()
  res.send(movie)
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("movie not found");
  }
  await Movie.deleteOne({_id:movie._id})
  res.send(movie)
});

exports.router=router;