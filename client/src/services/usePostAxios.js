import axios from 'axios';
// import { UseSignIn } from './UseGetStudent';

const URL = `http://localhost:8000`;
const headersAuthorization = {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}}

export async function signUp(url, obj) {
    const res = await axios.post(`${URL}/${url}`, obj);
    return res;
}

export async function UseCreate(url, obj) {
    try {
        const res = await axios.post(`${URL}/${url}`, obj, headersAuthorization)
        return res;
    } catch (error) {
        return error;
    }
}
