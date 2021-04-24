import axios from "axios";

axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const signUp = (credentials) => {
  return axios.post("/users/signup", credentials);
};

const logIn = (credentials) => {
  return axios.post("/users/login", credentials);
};

const logOut = () => {
  return axios.post("/users/logout");
};

const getCurrentUser = () => {
  return axios.get("/users/current");
};

const fetchContacts = () => {
  return axios.get("/contacts");
};

const addContact = (contact) => {
  return axios.post("/contacts", contact);
};

const deleteContact = (id) => {
  return axios.delete(`/contacts/${id}`);
};

const updateContact = (id) => {
  return axios.patch(`/contacts/${id}`);
};
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  token,
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
};
