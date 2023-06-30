import React, { Component } from 'react';

// utils fn()
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/pagination';

// components
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';

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

  handleClick = (movie) => {
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
        <div className="col">
          <p>Showing {filtered.length} movies in database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genra</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleClick(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-md"
                    >
                      <i class="fa fa-trash-o"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
