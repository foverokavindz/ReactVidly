import React, { Component } from 'react';

// utils fn()
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/pagination';

// components
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

class Movies extends Component {
  state = {
    allMovies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];

    this.setState({ allMovies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const allMovies = this.state.allMovies.filter((m) => m._id !== movie._id);
    this.setState({ allMovies });
  };

  handleLike = (movie) => {
    const allMovies = [...this.state.allMovies];
    const index = allMovies.indexOf(movie);
    allMovies[index] = { ...allMovies[index] };
    allMovies[index].liked = !allMovies[index].liked;
    this.setState({ allMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.allMovies;
    const { allMovies, currentPage, pageSize, selectedGenre } = this.state;

    if (count === 0) return <p>No movies in database</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    //util function
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <div className="row p-4">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col-10">
          <p>Showing {filtered.length} movies in database</p>

          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
