import {
  get,
  postWithToken,
  getWithToken,
  deleteWithToken,
  putWithToken,
  putWithTokenNoData,
} from "./axiosCrud";

export const getAllCategories = async () => {
  return get("/api/category/get");
};

export const getAllSubCategories = async () => {
  return get("/api/subcategory/getAll");
};

export const getAllItems = async () => {
  return get("/api/item/public/getAll");
};

export const getItemsBySubcategory = (subId) => {
  return get("/api/item/public/getBySubcategory/" + subId);
};

export const updateUserInfo = (info, token) => {
  return postWithToken("/api/user/information/create", info, token);
};
export const addItemToCard = (user, info, token) => {
  return postWithToken("/api/orderItem/add/" + user, info, token);
};
export const updateItemCard = (user, info, token) => {
  return putWithToken("/api/orderItem/update/" + user, info, token);
};
export const removeItemfromCard = (itemId, token) => {
  return deleteWithToken(`/api/orderItem/delete/${itemId}`, token);
};
export const getUserInfoWithToken = (user, token) => {
  return getWithToken("/api/user/information/get/" + user, token);
};
export const getUserTempOrder = (user, token) => {
  return getWithToken("/api/order/getTempOrder/" + user, token);
};
export const orderCheckout = (id, token) => {
  return putWithTokenNoData("/api/order/checkout/" + id, token);
};
export const getUserClosedOrders = (user, token) => {
  return getWithToken("/api/order/getAllOrders/" + user, token);
};
export const addToFavourites = (info, token) => {
  return postWithToken("/api/favourite/create", info, token);
};
export const removeFromFavourite = (id, token) => {
  return deleteWithToken("/api/favourite/delete/" + id, token);
};
export const getFavouriteList = (username, token) => {
  return getWithToken("/api/favourite/getAll/" + username, token);
};
