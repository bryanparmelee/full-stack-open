import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${blogObject.id}`;
  const response = await axios.put(url, blogObject, config);
  return response.data;
};

const remove = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${blogObject.id}`;
  const response = await axios.delete(url, config);
  return response.data;
};

export default { setToken, getAll, create, update, remove };
