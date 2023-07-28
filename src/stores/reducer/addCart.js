const initialState = {
  cart: [],
};

const addCart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        // cart: cart.push(action.payload.item),
        cart: [...state.cart, action.payload],
      };
    }
    case "DELETE_TO_CART": {
      let temp = state.cart.splice(action.payload, 1);
      return {
        ...state,
        // cart: cart.push(action.payload.item),
        cart: state.cart,
      };
    }

    case "CLEAR_CART": {
      return {
        cart: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default addCart;
