import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false
  	}

    this.getMovies = this.getMovies.bind(this)
    this.getFavorites = this.getFavorites.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
  }

  componentDidMount() {
    this.getMovies("28")
    this.getFavorites()
  }

  getMovies(genreID) {
    //make an axios request to your server on the GET SEARCH endpoint
    //based on the docs of the api, we have to pass a genre ID to our server 
    //to use as a search parameter
    axios.get('/search', {params: {genreID: genreID}})
    .then((response) => {
      console.log(response)
      this.setState({
        movies: response.data
      })
    })
  }

  getFavorites() {
    axios.get('/favorites')
    .then((response) => {
      this.setState({
        favorites: response.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleClick(movie) {
    //we will use the current state of show faves so that we can dynamically swap between saving
    //or deleting based on whether the state is on search list or favorites
    console.log(this.state.showFaves)
    
    if(!this.state.showFaves) {
      //we're on the result list, so we use save
      this.saveMovie(movie)
    } else {
      //otherwise use delete
      this.deleteMovie(movie)
    }
  }

  saveMovie(movie) {
    axios.post('/save', {movie: movie})
    .then((response) => {
      console.log('saved')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  deleteMovie(movie) {
    axios.post('/delete', {movie: movie})
    .then((response) => {
      console.log('deleted')
      this.getFavorites()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  swapFavorites() {
  //dont touch this
    this.setState({
      showFaves: !this.state.showFaves
    })
  /////////////////
    this.getFavorites()
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      
      <div className="main">
        <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} handleSearch={this.getMovies}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} handleClick={this.handleClick}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));