export const baseUrl = "https://auth.nomoreparties.co";

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ password, email })
    })
    .then((res) => {
        try {
            return res.json();
        }
        catch (err){
            return (err);
        }
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}

export const login = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ password, email })
    })
    .then((res) => {
        try {
            return res.json();
        }
        catch(err) {
            return (err);
        }
    })
    .then((res) => {
        if(res.token) {
            localStorage.setItem('token', res.token);
            return res;
        } else {
            return;
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

export const authentificateOnLoad = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        return err;
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}