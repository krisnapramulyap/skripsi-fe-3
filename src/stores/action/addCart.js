export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const deleteToCart = (index) => {
  return {
    type: "DELETE_TO_CART",
    payload: index,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
