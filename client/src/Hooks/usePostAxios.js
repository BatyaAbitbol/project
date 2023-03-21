import axios from 'axios';

export async function useSignUp(url, obj) {
    console.log(obj);
    try {
        const res = await axios.post(`http://localhost:8000/${url}`, obj);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}