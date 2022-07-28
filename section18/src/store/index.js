import { createStore } from 'redux';

const conuterReducer = (state = { counter: 0 }, action) => {
  if(action.type === 'increment') { // identifiers
    return {
      counter: state.counter + 1
    };
  }
  
  if(action.type === 'increase') {
    return {
      counter: state.counter + action.amount
    };
  }

  if(action.type === 'decrement') {
    return {
      counter: state.counter - 1
    };
  }

  return state;
};

const store = createStore(conuterReducer);

export default store;