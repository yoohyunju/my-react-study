import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

// 초기 데이터 정의
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {}, // 상태 변경 함수
  logout: () => {},
});

// 자동 로그아웃을 위한 만료 시간 계산 함수
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

// 토큰이 유효하면 받아오고 유효하지 않으면 삭제하는 함수
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

// 인증 관련 상태 관리
// 이 컴포넌트를 다른 컴포넌트를 감싸는 래퍼로 활용하면
// 다른 컴포넌트가 컨텍스트에 접근 가능
export const AuthContextProvider = (props) => {
  // 초기 token 설정
  const tokenData = retrieveStoredToken();
  let initalToken;

  if (tokenData) {
    initalToken = tokenData.token;
  }
  const [token, setToken] = useState(initalToken);

  const userIsLoggedIn = !!token; // 토큰이 빈 문자열이면 false 반환

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    // 사용자가 직접 로그아웃 할 때
    // 타이머가 설정되어 있을 시 타이머 클리어
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(loginHandler, remainingTime);
  };

  useEffect(() => {
    if(tokenData){
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
