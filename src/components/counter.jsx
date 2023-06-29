const Counter = (props) => {
  const { onIncrement, counter, onDelete, onDecrement } = props;

  const getBadgeClasses = () => {
    let classes = 'badge m-2 text-bg-';
    classes += counter.value === 0 ? 'warning' : 'primary';
    return classes;
  };

  const formatCount = () => {
    const { value } = counter;
    return value === 0 ? 'Zero' : value;
  };

  const zeroDisable = () => {
    let classes = 'btn btn-md m-2 btn-secondary';
    classes += counter.value > 0 ? ' ' : ' disabled';
    return classes;
  };

  return (
    <div class="container ">
      <div class="row ">
        <div class="col-1 border ">
          <span className={getBadgeClasses()}>{formatCount()}</span>
        </div>
        <div class="col-2 border">
          <button
            onClick={() => onIncrement(counter)}
            className="btn btn-secondary btn-md m-2"
          >
            +
          </button>

          <button
            onClick={() => onDecrement(counter)}
            className={zeroDisable()}
          >
            -
          </button>

          <button
            onClick={() => onDelete(counter.id)}
            className="btn btn-danger btn-md m-2 m-2"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
