import axios from 'axios';
// import { UseSignIn } from './UseGetStudent';
const URL = `http://localhost:8000`;
const headersAuthorization = {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}}
export async function useSignUp(url, obj) {
    try {
        const res = await axios.get(`http://localhost:8000/${url}`, { params: { idNumber: obj.idNumber } })
        // const res = await axios.post(`http://localhost:8000/${url}`, obj);
        // console.log(res);

        // if (res.status === 200) {
        //     return res;
        // }
        return res;
        // else {
        // }
    }
    catch (err) {
        try {
            const res = await axios.post(`http://localhost:8000/${url}`, obj);
            return res;
        } catch (error) {
            return error;
        }  
    }
}

export async function UseCreate(url, obj) {
    try {
        const res = await axios.post(`${URL}/${url}`, obj, headersAuthorization)
        return res;
    } catch (error) {
        return error;
    }
}

/*
משהו כאן הסתבך לי
אם כבר רשום צריך לבדוק
ואם לא רשום עדיין ובודקים זה נופל
*/
//