import { getToken } from './authManager'

const baseUrl = '/api/Transaction';

export const getTransactionById = (id) => {
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

export const getTransactionsByFirebaseUserId = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
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

export const deleteTransaction = (id) => {
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

export const addTransaction = (transaction) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transaction)
        })
    });
};

export const editTransaction = (transaction) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${transaction.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transaction)
        })
    })
};

export const searchTransactions = (input) => {
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

export const filterWeekly = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/filterWeek`, {
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

export const filterMonthly = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/filterMonth`, {
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