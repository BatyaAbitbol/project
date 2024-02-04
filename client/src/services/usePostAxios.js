import axios from 'axios';
// import { UseSignIn } from './UseGetStudent';

const URL = `http://localhost:8000`;

export async function signUp(url, obj) {
    try {    
        const res = await axios.post(`${URL}/${url}`, obj);
        return res;
    } catch (error) {
        return error;
    }
}

export async function UseCreate(url, obj) {
    const headersAuthorization = { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
    try {
        const res = await axios.post(`${URL}/${url}`, obj, headersAuthorization)
        return res;
    } catch (error) {
        return error;
    }
}
