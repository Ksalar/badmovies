import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
        <ul className="movies">
          {this.props.movies.map((movie, idx) => {
            return (
            <li className="movie_item" key={idx} onClick={() => {this.props.handleClick(movie)}}>
              <img src={movie.poster_path ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path : "https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300"}/>
              <div className="movie_description">
                <h2>{movie.title}</h2>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.release_date ? movie.release_date.slice(0,4) : "none"}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.vote_average ? movie.vote_average : "none"}</span>
                  </div>
                </section>
              </div>
            </li>)
          })}
        </ul>)
  }
}

export default Movies