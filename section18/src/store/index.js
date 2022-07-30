// import { createStore } from 'redux';
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

/* redux-toolkit 코드 */
// createSlice는 객체를 인자로 생성, 전역 상태의 slice를 미리 만들어놔야 함
// 상태가 여러 조각으로 나뉘어 있음 (인증 상태, 카운터 상태 등)
const counterSlice = createSlice({
  name: "counter", // slice 필수 식별자
  initialState, // js가 자동으로 initialState로 초기 상태 설정
  reducers: {
    // 객체 or 맵 이라고 할 수 있음, 객체 안에 메서드 추가 -> 자동으로 최근 값을 받음, if문 작성 안해도 됨
    increment(state) {
      state.counter++; // 기본 상태를 변경하는 것 처럼 보이지만, toolkit은 내부적으로 immer 패키지를 사용하여 코드를 감지해 원래 상태를 복제하여 새로운 상태 객체를 생성 -> 오버라이드
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

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
  reducer: counterSlice.reducer // 전역 상태를 담당하는 단 하나의 주요 리듀서 함수만 있어야 함
}); // createSlice에서 설정한 reducer에 접근

export const counterActions = counterSlice.actions; // 액션 생성자: 액션 객체가 생김

export default store;
