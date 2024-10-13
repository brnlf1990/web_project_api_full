export const BASE_URL = "https://around-api.strangled.net";

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((res) => {
      if (res) {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
      
    })
};

export const autorization = ({ email, password }) => {

    return fetch(`${BASE_URL}/signin`, {
      
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {

          
          return response.json();
        }
      })
      
  };

  export const checkToken = (token) => {
    
    return fetch(`${BASE_URL}/cards`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          
          return response.json();
        }
      })
      .then((data) => {
        return data
      });
  };