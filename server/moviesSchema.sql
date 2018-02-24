DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movies (
  id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
  movie_id INTEGER NOT NULL UNIQUE,
  title VARCHAR(255), 
  poster_path VARCHAR(255),
  release_date VARCHAR(255),
  vote_average VARCHAR(5)
);