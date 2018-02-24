var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
var db = require('./database.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.get('/search', function(req, res) {
  let genreID = req.query.genreID

  axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.asc&with_genres=${genreID}&api_key=b23471b38cebc297f8072ffddf620b40&language=en-US`)
  .then((response) => {
    res.send(response.data.results)
  })
  .catch((err) => {
    console.log(err)
    res.send([])
  })
})

app.get('/genres', function(req, res) {
  axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b23471b38cebc297f8072ffddf620b40&language=en-US')
  .then((response) => {
    res.send(response.data)
  })
  .catch((err) => {
    console.log(err)
    res.send([])
  })
})

app.get('/favorites', function(req, res) {
  db.getAllFavorites((err, results) => {
    if (err) {
      console.log(err)
      res.send([])
    } else {
      console.log(results)
      res.send(results)
    }
  })
})

app.post('/save', function(req, res) {
  let movie = req.body.movie
  db.saveFavorite(movie, (err, results) => {
    if (err) {
      console.log(err)
    }
    res.end()
  })
})

app.post('/delete', function(req, res) {
  let movie = req.body.movie
  db.deleteFavorite(movie, (err, results) => {
    if (err) {
      console.log(err)
    }    
    res.end()
  })
})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});