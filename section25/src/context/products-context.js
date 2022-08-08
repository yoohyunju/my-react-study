import React, { useState } from "react";

// React의 Context 객체 생성
export const ProductsContext = React.createContext({
  products: [],
  toggleFav: () => {} // 초기값에 추가해서 자동완성 지원되게 하기
});

// JSX를 반환하는 함수형 컴포넌트
export default (props) => {
  const [productsList, setProductsList] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);

  // 좋아요 상태 토글 함수
  const toggleFavorite = (productId) => {
    setProductsList((currentProdList) => {
      const prodIndex = currentProdList.findIndex((p) => p.id === productId);
      const newFavStatus = !currentProdList[prodIndex].isFavorite;
      const updatedProducts = [...currentProdList]; // 기존 상태 변경하지 않기 위해 복사
      updatedProducts[prodIndex] = {
        ...currentProdList[prodIndex],
        isFavorite: newFavStatus,
      };

      return updatedProducts;
    });
  };

  // Context 제공
  return (
    <ProductsContext.Provider value={{ products: productsList, toggleFav: toggleFavorite }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
