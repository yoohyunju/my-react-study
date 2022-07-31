import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

/* redux-toolkit 코드 */
// createSlice는 객체를 인자로 생성, 전역 상태의 slice를 미리 만들어놔야 함
// 상태가 여러 조각으로 나뉘어 있음 (인증 상태, 카운터 상태 등)
const counterSlice = createSlice({
  name: "counter", // slice 필수 식별자
  initialState: initialCounterState, // js가 자동으로 initialState로 초기 상태 설정
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

export const counterActions = counterSlice.actions; // 액션 생성자: 액션 객체가 생김
export default counterSlice.reducer; // counterSlice에서 필요한 reducer 부분만 export
