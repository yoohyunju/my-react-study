import React, { useState } from "react";

// 초기 데이터 정의
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {}, // 상태 변경 함수
  logout: () => {},
});

// 인증 관련 상태 관리
// 이 컴포넌트를 다른 컴포넌트를 감싸는 래퍼로 활용하면
// 다른 컴포넌트가 컨텍스트에 접근 가능
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token; // 토큰이 빈 문자열이면 false 반환

  const loginHandler = () => {
    setToken(token);
  }
  
  const logoutHandler = () => {
    setToken(null);
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;