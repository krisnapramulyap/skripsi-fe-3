import axios from "../../utils/axios";

export const getAllProduct = (page, limit, category, search, sort, order) => {
  return {
    type: "GETALLPRODUCT",
    payload: axios.get(
      `/product?page=${page}&limit=${limit}&category=${category}&search=${search}&sort=${sort}&order=${order}`
    ),
  };
};

export const getProductById = (id) => {
  return {
    type: "GETPRODUCTBYID",
    payload: axios.get(`/product/${id}`),
  };
};

export const postProduct = (data) => {
  return {
    type: "POSTPRODUCT",
    payload: axios.post("/product", data),
  };
};

export const updateProduct = (id, data) => {
  return {
    type: "UPDATEPRODUCT",
    payload: axios.patch(`/product/${id}`, data),
  };
};

export const deleteProduct = (id) => {
  return {
    type: "DELETEPRODUCT",
    payload: axios.delete(`/product/${id}`),
  };
};
