const initalState = {
  isLoading: false,
  isError: false,
  msg: "",
  allProduct: [],
  pageInfo: {},
};

const product = (state = initalState, action) => {
  switch (action.type) {
    case "GETALLPRODUCT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "GETALLPRODUCT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        allProduct: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case "GETALLPRODUCT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
        allProduct: [],
        pageInfo: {},
      };
    }
    case "POSTPRODUCT_PENDING": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: "",
      };
    }
    case "POSTPRODUCT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "POSTPRODUCT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "UPDATEPRODUCT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "UPDATEPRODUCT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "UPDATEPRODUCT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};

export default product;
