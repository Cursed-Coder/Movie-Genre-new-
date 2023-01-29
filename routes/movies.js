const { Genre } = require("../models/genres");
const { validateMovie, Movie } = require("../models/movies");
const router = require("express").Router();

router.post("", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send("Invalid Movie types....");
  }
  genres2 = new Set();
  const genres = [];
  for (genreIdx in req.body.genres) {
    genres2.add(req.body.genres[genreIdx]);
  }
  genres3 = [];
  genres2.forEach(function (c) {
    genres3.push(c);
  });
  for (i in genres3) {
    const tempGenreId = genres3[i];
    const tempGenre = await Genre.findById(tempGenreId);
    if (!tempGenre) {
      return res.status(404).send("You have entered an invalid genre....");
    }

    const genre = new Genre();
    // console.log(tempGenre)
    // console.log(genre)
    // console.log(tempGenre._doc.name)
    genre._doc._id = tempGenre._doc._id;
    genre._doc.name = tempGenre._doc.name;
    // console.log(genre)
    genres.push(genre);
  }
  // async function dummyFunction() {
  //   p=[]
  //  p.push(genres2.forEach( function (v) {
  //     // console.log(v)
  //     const tempGenreId=v;
  //     return Genre.findById(tempGenreId);
  //     if (!tempGenre) {
  //       return res.status(404).send("You have entered an invalid genre....");
  //     }

  //     const genre = new Genre();
  //     // console.log(tempGenre)
  //     // console.log(genre)
  //     // console.log(tempGenre._doc.name)
  //     genre._doc._id = tempGenre._doc._id;
  //     genre._doc.name = tempGenre._doc.name;
  //     // console.log(genre)
  //     genres.push(genre);
  //     // console.log(genres.length);
  //   }));
  //   Promise.all(p).then(result=>
  //     console.log(result)
  //   )
  //   console.log(genres.length);
    const movie = new Movie({
      title: req.body.title,
      genres: genres,
      numberInStock: req.body.numberInStock,
      dailyRentalCost: req.body.dailyRentalCost,
    });
    try {
      const result = await movie.save();
      console.log(result);
      res.send(movie);
    } catch (ex) {
      let err = [];
      for (field in ex.errors) {
        err.push(ex.errors[field].message);
      }
      // console.log('Hello')
      // console.log(ex)
      return res.send(err);
    }
  // }
  // dummyFunction();
  // genres.forEach(function (c) {
  //   console.log(c);
  // });
  // for(i in genres2){
  //   console.log(i)
  //   genres.push(i)
  // }
});
router.get("", async (req, res) => {});
router.get("", async (req, res) => {});
router.put("", async (req, res) => {});
router.delete("", async (req, res) => {});

// router.get("/", async (req, res) => {
//   const result = await Movie.find();
//   res.send(result);
// });

// router.get("/:id", async (req, res) => {
//   const movie = await Movie.findById(req.params.id);
//   if (!movie) {
//     return res.status(404).send("movie not found");
//   }
//   res.send(movie);
// });
// router.post("/", async (req, res) => {
//   const { error } = validateMovie(req.body);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }
//   // console.log(req.body.genres)
//   const genres = [];
//   for (idx in req.body.genres) {
//     const genreId=req.body.genres[idx]
//     // console.log("Here")
//     console.log(genreId)
//     const tempGenre = await Genre.findById(genreId)
//     console.log(tempGenre)
//     if (!tempGenre)
//       return res.status(404).send(`Genre with id ${genreId} not found`);
//     const genre = new Genre({
//     });
//     console.log(`TEMPGENRE ID IS ${tempGenre._doc._id}`)
//     genre._id=tempGenre._doc._id
//     genre.title=tempGenre._doc.title
//     // console.log(genre)
//     genres.push(genre);
//   }

//   const movie = new Movie({
//     title: req.body.title,
//     genres: genres,
//     dailyRentalCost: req.body.dailyRentalCost,
//     numberInStock: req.body.numberInStock,
//   });
//   errors = [];
//   try {
//     const result = await movie.save();
//     return res.send(result);
//   } catch (ex) {
//     res.send(ex)
//     for (field in ex.errors) {
//       // console.log(ex.errors[field].message);
//       errors.push(ex.errors[field].message);
//     }
//     console.log("Hello")
//     // return res.send(errors);
//   }
// });

// router.put("/:id", async (req, res) => {
//   const movie = await Movie.findById(req.params.id);
//   if (!movie) {
//     return res.status(404).send("movie not found");
//   }
//   const { error } = validate(req.body);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }
//   movie.set({ _title: req.body.title });
//   await movie.save()
//   res.send(movie)
// });

// router.delete("/:id", async (req, res) => {
//   const movie = await Movie.findById(req.params.id);
//   if (!movie) {
//     return res.status(404).send("movie not found");
//   }
//   await Movie.deleteOne({_id:movie._id})
//   res.send(movie)
// });

// exports.router=router;

module.exports = router;
