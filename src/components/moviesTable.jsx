import Like from './common/like';
import React, { useState } from 'react';
import Table from './common/table';

const MoviesTable = ({ movies, onLike, onDelete, onSort, sortColumn }) => {
  const [columns] = useState([
    { path: 'title', labal: 'Title' },
    { path: 'genre.name', labal: 'Genre' },
    { path: 'numberInStock', labal: 'Stock' },
    { path: 'dailyRentalRate', labal: 'State' },
    {
      key: 'like',
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => {
            onLike(movie._id);
          }}
        />
      ),
    },
    {
      key: 'delete',
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-md"
        >
          <i class="fa fa-trash-o"></i>
        </button>
      ),
    },
  ]);

  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
