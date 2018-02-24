import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      genre: ''
    }
    this.getGenres = this.getGenres.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    //On mount of the search bar, get list of components
    this.getGenres()
  }
  
  handleChange(e) {
    //Handle changing of the select field
    this.setState({
      genre: e.target.value
    })
  }
  
  handleSearch() {
    //call the passed down search function with the currently selected genre
    this.props.handleSearch(this.state.genre)
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
    .then((response)  => {
      console.log(response.data.genres)
      this.setState({
        genres: response.data.genres
      })
    })
    .catch((err) => {
      throw err
    })
  }
  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        <select value={this.state.genre} onChange={this.handleChange}>
          {this.state.genres.map((genre, idx) => {
            return <option value={genre.id} key={idx}>{genre.name}</option>
          })}
        </select>

        <br/><br/>

        <button onClick={this.handleSearch}>Search</button>

      </div>)
  }
}

export default Search