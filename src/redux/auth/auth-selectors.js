const getIsAuthenticated = state => state.auth.isAuthenticated;

const getUsername = state => state.auth.user.name;
const getError = state => state.contacts.error;
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getIsAuthenticated,
  getUsername,
  getError,
};
