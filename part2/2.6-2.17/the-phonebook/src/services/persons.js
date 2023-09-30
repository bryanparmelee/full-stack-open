import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newObject) => axios.post(baseUrl, newObject);
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject);
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  create,
  update,
  deletePerson,
};
