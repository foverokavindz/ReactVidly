const Like = ({ liked, onClick, movieId }) => {
  let classes = 'fa fa-heart';
  if (!liked) classes += '-o';
  return (
    <i
      className={classes}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      key={movieId}
    ></i>
  );
};

export default Like;
