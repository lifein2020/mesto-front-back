export const BASE_URL = 'http://localhost:3005';

// Сhecking the response from the server
const getResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password: password, email: email})
    })
    .then(getResponse);
}   

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    })
    .then(getResponse);
};

// Token verification
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
        }
    })
    .then(getResponse);
};
