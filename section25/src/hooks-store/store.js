import { useState, useEffect } from "react";

// Hook 밖에서 변수들이 정의되어
// 커스텀 훅을 사용하는 모든 컴포넌트가 같은 값을 사용할 수 있음
let globalState = {};
let listeners = []; // state의 변경 사항을 따라가는 변수
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1]; // setState 함수
  
  const dispatch = (actionIdentifier, payload) => { // payload는 객체, 문자열, 숫자 등 모두 가능
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState); // 컴포넌트가 마운트 될 때 실행

    return () => {
      // 컴포넌트가 제거될 때 clean up 함수 실행
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]); // setState가 재실행 될 일은 없어서 안써주어도 됨

  return [globalState, dispatch];
};

export const initStore = (userActions, initalState) => { // store 초기화
  if (initalState) {
    globalState = { ...globalState, ...initalState };
  }

  actions = { ...actions, ...userActions };
};
