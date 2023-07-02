import Counter from './counter';

const Counters = (props) => {
  const { onReset, counters, onDelete, onIncrement, onDecrement } = props;
  return (
    <>
      <button onClick={onReset} className="btn btn-info btn-md m-2">
        reset
      </button>
      {counters.map((counter) => (
        <Counter
          key={counter.id} // { id: 1, value: 4 }
          onDelete={onDelete}
          counter={counter} // { id: 1, value: 4 }
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </>
  );
};

export default Counters;
