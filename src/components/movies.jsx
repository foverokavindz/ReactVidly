import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/pagination';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]); // [{key:Value}, {}, {}, {}, {}]
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

  useEffect(() => {
    const fetchMoviesAndGenres = () => {
      const genresData = [{ _id: '', name: 'All Genres' }, ...getGenres()];
      const moviesData = getMovies();

      setGenres(genresData);
      setAllMovies(moviesData);
    };

    fetchMoviesAndGenres();
  }, []);

  const handleDelete = (movie) => {
    setAllMovies((prevMovies) => {
      const index = prevMovies.findIndex((m) => m._id === movie._id);
      if (index !== -1) {
        const updatedMovies = [...prevMovies];
        updatedMovies.splice(index, 1); // Remove the movie from the array
        return updatedMovies;
      }
      return prevMovies;
    });
  };

  const handleSort = (updatedSortColumn) => {
    setSortColumn(updatedSortColumn);
  };

  const handleLike = (movieId) => {
    setAllMovies((prevMovies) => {
      return prevMovies.map((movie) => {
        if (movie._id === movieId) {
          return { ...movie, liked: !movie.liked }; // Toggle liked status for selected movie
        }
        return movie;
      });
    });
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

  // 1
  const filtered =
    selectedGenre && selectedGenre._id
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

  // 2
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  // 3
  const movies = paginate(sorted, currentPage, pageSize);

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
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
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
