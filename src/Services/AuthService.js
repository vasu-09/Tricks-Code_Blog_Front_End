
import axios from "axios";
import Cookies from 'js-cookie';

export const registerApicall = (register) => axios.post("http://localhost:8080/auth/register", register)

export const loginApicall = (usernameOrEmail, password) =>axios.post("http://localhost:8080/auth/login", {usernameOrEmail, password})

export const storeToken = (token) => Cookies.set("token", token, { expires: 7 }); // Set an expiry date if needed

export const getToken = () => Cookies.get("token");

export const saveLoggedInUser = (username, role) => {
  Cookies.set("authenticatedUser", username);
  Cookies.set("role", role);
};

export const isUserLoggedIn = () => {
  const username = Cookies.get("authenticatedUser");

  return !!username; // Using double negation to convert to boolean
};

export const authuser = () =>{
  const username = Cookies.get("authenticatedUser");
  return username;
}
export const getLoggedInUser = () => {
  return Cookies.get("authenticatedUser");
};

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("authenticatedUser");
  Cookies.remove("role");
};

export const isAdmin = () => {
  const role = Cookies.get("role");

  return role !== null && role === 'ROLE_ADMIN';
};

export const isUser = () => {
    const role = Cookies.get("role");
  
    return role !== null && role === 'ROLE_USER';
  };

