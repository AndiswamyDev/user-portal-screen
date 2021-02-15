const serverPort = 'http://localhost:3030';
const axios = require('axios');

export async function getUserData(data) {
    const response = await axios.post(`${serverPort}/api/login`, data);
    console.log('response', response.data);
    return response.data;
}

export async function createUser(data) {
    const response = await axios.post(`${serverPort}/api/signup`, data);
    console.log('response', response.data);
    return response.data;
}