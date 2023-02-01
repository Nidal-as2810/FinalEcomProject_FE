import axios from "./axios";

export const get = async (url) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    return err;
  }
};

export const getWithToken = async (url, token) => {
  var params = { Authorization: "Bearer " + token };

  try {
    const response = await axios.get(url, {
      params: params,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const postWithToken = async (url, data, token) => {
  var params = { Authorization: "Bearer " + token };

  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      params: params,
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

export const putWithToken = async (url, data, token) => {
  var params = { Authorization: "Bearer " + token };

  try {
    const response = await axios.put(url, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      params: params,
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

export const putWithTokenNoData = async (url, token) => {
  var params = { Authorization: "Bearer " + token };
  console.log(token);
  try {
    const response = await axios.put(url, null, {
      headers: { "Content-Type": "application/json" },
      params: params,
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteWithToken = async (url, token) => {
  var params = { Authorization: "Bearer " + token };

  try {
    axios.delete();
    const response = await axios.delete(url, {
      headers: { "Content-Type": "application/json" },
      params: params,
    });

    return response.data;
  } catch (err) {
    return err;
  }
};
