import axios from "../../utils/axios";

export const getUserById = (id) => {
  return {
    type: "GETUSERBYID",
    payload: axios.get(`/user/${id}`),
  };
};
