import { combineReducers } from "redux";
import dataUserById from "./dataUser";
import product from "./allProduct";
import promo from "./promo";
import addCart from "./addCart";

export default combineReducers({
  product,
  promo,
  dataUserById,
  addCart,
});
