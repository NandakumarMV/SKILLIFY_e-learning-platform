// axios-config.js

import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to the error page or handle as needed
      // window.location.href = '/error'; // Example: Redirect to an error page
    }

    return Promise.reject(error);
  }
);

export default instance;
