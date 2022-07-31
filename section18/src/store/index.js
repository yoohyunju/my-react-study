// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import conuterReducer from "./counter";
import authReducer from "./auth";

/* redux 코드 */
// const conuterReducer = (state = initialState, action) => {
//   if(action.type === 'increment') { // identifiers
//     // 원본 state를 직접 변경하면 안됨!!
//     // state.counter++;
//     // return state;

//     // 꼭 새로운 객체로 반환하기
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter // 설정하지 않으면 undefined 값을 가지게 되어 카운터가 닫히게 됨
//     };
//   }

//   if(action.type === 'increase') {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter
//     };
//   }

//   if(action.type === 'decrement') {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     };
//   }

//   if(action.type === 'toggle') {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter
//     };
//   }

//   return state;
// };

const store = configureStore({
  reducer: { counter: conuterReducer, auth: authReducer }, // 리듀서 함수 병합
}); // createSlice에서 설정한 reducer에 접근

export default store;
