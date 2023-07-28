import axios from "../../utils/axios";

export const getAllPromo = () => {
  return {
    type: "GETALLPROMO",
    payload: axios.get(`/promo`),
  };
};

export const getPromoById = (id) => {
  return {
    type: "GETPROMOBYID",
    payload: axios.get(`/promo/${id}`),
  };
};

export const postPromo = (data) => {
  return {
    type: "POSTPROMO",
    payload: axios.post(`/promo`, data),
  };
};

export const updatePromo = (id, data) => {
  return {
    type: "UPDATEPROMO",
    payload: axios.patch(`/promo/${id}`, data),
  };
};

export const deletePromo = (id) => {
  return {
    type: "DELETEPROMO",
    payload: axios.delete(`/promo/${id}`),
  };
};

export const selectPromo = (data) => {
  return {
    type: "SELECTPROMO",
    payload: data,
  };
};
