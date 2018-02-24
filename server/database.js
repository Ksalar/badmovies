const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {

  connection.query('SELECT * FROM movies', (err, results) => {
    callback(err, results)
  })

};
const saveFavorite = function(movie, callback) {

  let qString = `INSERT IGNORE INTO movies (movie_id, title, poster_path, release_date, vote_average)
                  VALUES ("${movie.id}", "${movie.title}", "${movie.poster_path}", "${movie.release_date}", "${movie.vote_average}")
                `
  connection.query(qString, (err, results) => {
    callback(err, results)
  })

};
const deleteFavorite = function(movie, callback) {

  let qString = `DELETE FROM movies WHERE movie_id = ${movie.movie_id}`

  connection.query(qString, (err, results) => {
    callback(err, results)
  })

};
module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};
