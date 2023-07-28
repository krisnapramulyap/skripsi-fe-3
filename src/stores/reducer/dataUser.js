const initialState = {
  user: {},
  msg: "",
};

const getUserById = (state = initialState, action) => {
  switch (action.type) {
    case "GETUSERBYID_PENDING": {
      return {
        ...state,
      };
    }
    case "GETUSERBYID_FULFILLED": {
      return {
        ...state,
        user: action.payload.data.data[0],
      };
    }
    case "GETUSERBYID_REJECTED": {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default getUserById;
