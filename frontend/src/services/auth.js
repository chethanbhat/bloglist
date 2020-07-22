import axios from "axios";
const loginURL = "/api/login";
const signupURL = "/api/users";

const login = async (credentials) => {
  try {
    const response = await axios.post(loginURL, credentials);
    return response.data;
  } catch (error) {
    return null;
  }
};

const signup = async (credentials) => {
  try {
    const response = await axios.post(signupURL, credentials);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default { login, signup };
