const Counter = (props) => {
  const { onIncrement, counter, onDelete } = props;

  const getBadgeClasses = () => {
    let classes = 'badge m-2 text-bg-';
    classes += counter.value === 0 ? 'warning' : 'primary';
    return classes;
  };

  const formatCount = () => {
    const { value } = counter;
    return value === 0 ? 'Zero' : value;
  };

  return (
    <div>
      <span className={getBadgeClasses()}>{formatCount()}</span>
      <button
        onClick={() => onIncrement(counter)}
        className="btn btn-secondary btn-md"
      >
        Increment
      </button>
      <button
        onClick={() => onDelete(counter.id)}
        className="btn btn-danger btn-md m-2"
      >
        Delete
      </button>
    </div>
  );
};

export default Counter;
