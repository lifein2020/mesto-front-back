class Api {
  constructor ({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Handling of responses from server
  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _getHeaders() {
    let jwt = localStorage.getItem('jwt');
    return { ...this.headers, 
             'Authorization': `Bearer ${jwt}`
           }
  }

  // Getting user data (mine)
  getUserInfo() {
    return fetch(this.baseUrl + 'users/me', {
      headers: this._getHeaders(),
    }).then(this._getResponse);
  }

  getCardsList() {
    return fetch(this.baseUrl + 'cards', { 
      headers: this._getHeaders(),
    }).then(this._getResponse);
  }

  // Add cards
  postAddCard({ card_name, card_image_link }) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: card_name,
        link: card_image_link
      }),
      headers: this._getHeaders(),
    })
    .then(this._getResponse);
  }

  // Edit the profile
  patchUserInfo({userName, userDescription}) {
    return fetch(this.baseUrl + 'users/me', { //`${this.baseUrl}users/me`
      method: 'PATCH',
      body: JSON.stringify({
        name: userName,
        about: userDescription,
      }),
      headers: this._getHeaders(),
    })
    .then(this._getResponse);
  }

  // Change the avatar
  patchAvatarUser({ avatarUrl }) {
    return fetch(this.baseUrl + 'users/me/avatar', { //`${this.baseUrl}users/me/avatar`
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatarUrl
      }),
      headers: this._getHeaders(),
    })
    .then(this._getResponse);
  }

  // Delete card
  deleteCard(id) {
    return fetch(`${this.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._getResponse);
  }

  // Поставить лайк
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.baseUrl}cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT', // if the card is already liked (black like), then delete the like, otherwise put
      headers: this._getHeaders(),
    })
    .then(this._getResponse);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3005/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;