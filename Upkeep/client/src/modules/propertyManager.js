import { getToken } from './authManager'

const baseUrl = '/api/Property';

export const getPropertyById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong :(")
            }
        })
    })
};

export const getPropertiesByUserId = (userId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong :(")
            }
        })
    })
};

export const deleteProperty = (id) => {
    return getToken().then((token) => {
        fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    })
};

export const addProperty = (property) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(property)
        })
    });
};

export const editProperty = (property) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${property.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(property)
        })
    })
};

export const searchProperties = (input) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/search?criterion=${input}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong :(")
            }
        })
    })
};


