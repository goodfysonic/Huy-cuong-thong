import React from 'react';
import { ACCESS_TOKEN, ENDPOINTS } from '@/constants/endpoints';

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    const formBody = Object.keys(loginRequest)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(loginRequest[key]))
        .join('&');

    return request({
        url: ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    });
    
}

