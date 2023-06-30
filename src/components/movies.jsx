import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/pagination';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchMoviesAndGenres = () => {
      const genresData = [{ name: 'All Genres' }, ...getGenres()];
      const moviesData = getMovies();

      setGenres(genresData);
      setAllMovies(moviesData);
    };

    fetchMoviesAndGenres();
  }, []);

  const handleDelete = (movie) => {
    const updatedMovies = allMovies.filter((m) => m._id !== movie._id);
    setAllMovies(updatedMovies);
  };

  const handleLike = (movie) => {
    const updatedMovies = [...allMovies];
    const index = updatedMovies.indexOf(movie);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
    setAllMovies(updatedMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const { length: count } = allMovies;

  if (count === 0) return <p>No movies in database</p>;

  const filtered =
    selectedGenre && selectedGenre._id
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

  const movies = paginate(filtered, currentPage, pageSize);

  return (
    <div className="row p-4">
      <div className="col-2">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col-10">
        <p>Showing {filtered.length} movies in database</p>

        <MoviesTable
          movies={movies}
          onLike={handleLike}
          onDelete={handleDelete}
        />

        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;

/* // old code 
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

    // render
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

*/
