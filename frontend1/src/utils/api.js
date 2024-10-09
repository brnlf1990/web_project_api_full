import { Promise } from "core-js";

export class Api {
  constructor({ baseUrl, headers }, popupElements) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method:"GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        
        return res.json().then((data) =>{
          
          return data
        })
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => data.data)
      }

    });
  }
 

  likeCard(cardId, userId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ userId: userId })
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => data.data);
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  dislikeCard(cardId, userId) {
    return fetch(`${this._baseUrl}/cards/dislike/${cardId}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ userId: userId })
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => data.data);
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
    

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  patchUserInfo(userId, {name, about}) {
    return fetch(`${this._baseUrl}/users/${userId}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify( {name, about} ),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) =>{
          
          return data
        })
        
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  userAvatar(userId,  {avatar} ) {
    return fetch(`${this._baseUrl}/users/${userId}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar}),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => data.user);
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  postNewCard({ name, link, owner }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
        owner:owner,
        
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => data.data);
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Authorization" : `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});

export default api;
