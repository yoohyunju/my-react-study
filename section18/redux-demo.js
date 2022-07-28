const redux = require('redux');

const conuterReducer = (state = { counter: 0 }, action) => { // state의 초기값 주지 않으면 undefined여서 실행 오류
  if(action.type === 'increment'){
    return {
      counter: state.counter + 1
    };
  } else if(action.type === 'decrement'){
    return {
      counter: state.counter - 1
    };
  }
}; // 리듀서 함수

const store = redux.createStore(conuterReducer); // 저장소

const counterSubscriber = () => {
  const latesState = store.getState();
  console.log(latesState);
}

store.subscribe(counterSubscriber); // 함수 실행하지 않고 포인터 전달
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });