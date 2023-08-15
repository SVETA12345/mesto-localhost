
import { useState, useEffect } from "react";
export const BASE_URL = 'http://localhost:4000';

function getResponseData(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = ( password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email})
  })
  .then((response) => {
      return getResponseData(response)
    
  })
}; 

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({password,email})
    })
    .then((response) => {
      console.log(response) 
      return getResponseData(response)
    })
    .then((data) => {
      
      if (data.token){
        console.log('data_1',data)
        return data;
      }
      
    })
    .catch(err => console.log(err))
  }; 

  // получение данных пользователя
  export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then((res) => {
      return getResponseData(res) 
    })
    .then(data => data)
  } 