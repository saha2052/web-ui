import {keycloak} from "../configuration/keycloak";

let _headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

function updateHeaders(newHeaders) {
    _headers = Object.assign(_headers, newHeaders);
    Object.keys(_headers).forEach((key) => {
        if (undefined === _headers[key]) {
            delete _headers[key];
        }
    });
}

export function headers() {
    return _headers;
}

export function parseJSON(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response);
}

export const get = (uri) => {
    updateHeaders({Authorization: `Bearer ${keycloak.token}`});
    let options = {method: 'GET', headers: {..._headers}};
    return fetch(uri, options)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                case 403:
                    return Promise.reject(response);
                default:
                    return Promise.reject(response);
            }
        })
        .catch(error => {
            return Promise.reject(error)
        })
}

export function save(uri, dataArg, method) {
    updateHeaders({Authorization: `Bearer ${keycloak.token}`});
    const data = (typeof dataArg === 'object') ? JSON.stringify(dataArg) : dataArg;
    const options = {method: method, headers: {..._headers}, body: data};

    return fetch(uri, options)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                case 201:
                    return response.json();
                case 403:
                    return Promise.reject(response);
                default:
                    return Promise.reject(response);
            }
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export function del(uri, accessToken, dataArg) {
    const data = (typeof dataArg === 'object') ?
        JSON.stringify(dataArg) : dataArg;
    const options = {
        method: 'DELETE',
        headers: {
            ..._headers,
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    };
    return fetch(uri, options)
        .then(response => {
                if (response.status !== 204) {
                    response.json();
                }
            }
        )
        .catch(error => {
            console.error(error);
            return Promise.reject(error)
        });
}