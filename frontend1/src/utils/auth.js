export const BASE_URL = "http://localhost:3001";

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
    });
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
      .then((data) => {
        if (data) {
          localStorage.localStorage('token', data.token)
        }
      });
  };

  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem(token)}`,
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