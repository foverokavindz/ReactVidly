import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  render() {
    return (
      <>
        <button
          onClick={this.props.onReset}
          className="btn btn-info btn-md m-2"
        >
          reset
        </button>
        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id} // { id: 1, value: 4 }
            onDelete={this.props.onDelete}
            counter={counter} // { id: 1, value: 4 }
            onIncrement={this.props.onIncrement}
          />
        ))}
      </>
    );
  }
}

export default Counters;
