export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(res => {
        return res.json();
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
    .then(res => {
      return res.json();
    });
  }

  updateUserInfo(title, subtitle) {
    return fetch(`${this._baseUrl}/users/me`, { 
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: subtitle
      })
    })
      .then(res => {
        return res.json();
      })
  }

  sendNewCard(link, name) {
    return fetch(`${this._baseUrl}/cards`, { 
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        return res.json();
      })
  }
}