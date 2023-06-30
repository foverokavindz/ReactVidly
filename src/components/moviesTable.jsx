import Like from './common/like';

const MoviesTable = (props) => {
  const { movies, handleClick, handleDelete } = props;
  return (
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
              <Like liked={movie.liked} onClick={() => handleClick(movie)} />
            </td>
            <td>
              <button
                onClick={() => handleDelete(movie)}
                className="btn btn-danger btn-md"
              >
                <i class="fa fa-trash-o"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
