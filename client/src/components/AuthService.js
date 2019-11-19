import decode from "jwt-decode";
import axios from "axios";

export default class AuthService {
  constructor() {
    this.login = this.login.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.getToken = this.getToken.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  login(email, password) {
    const postBody = {
      email: email,
      password: password
    };
    this.setToken(null);
    axios
      .post("/api/v1/users/authenticate", postBody)
      .then(response => {
        this.setToken(response.data.auth_token);
      })
      .catch(_error => {});
  }

  register(email, password, name) {
    const postBody = {
      email: email,
      password: password,
      name: name
    };
    axios
      .post("/api/v1/users/register", postBody)
      .then(response => {
        this.setToken(null);
        alert("Registration successful!");
      })
      .catch(_error => {});
  }

  setToken(token) {
    localStorage.setItem("authToken", token);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("authToken");
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }
}
