const initalState = {
  isLoading: false,
  isError: false,
  msg: "",
  data: [],
  pageInfo: {},
  selectPromo: {},
};

const promo = (state = initalState, action) => {
  switch (action.type) {
    case "GETALLPROMO_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "GETALLPROMO_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case "GETALLPROMO_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
        data: [],
        pageInfo: {},
      };
    }
    case "POSTPROMO_PENDING": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: "",
      };
    }
    case "POSTPROMO_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "POSTPROMO_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "UPDATEPROMO_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "UPDATEPROMO_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "UPDATEPROMO_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "SELECTPROMO": {
      return {
        ...state,
        selectPromo: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default promo;
