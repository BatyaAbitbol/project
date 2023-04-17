import axios from 'axios';
// import { UseSignIn } from './UseGetStudent';

export async function useSignUp(url, obj) {
    // const res = await axios.get(`http://localhost:8000/${url}`, {params: {idNumber: obj.idNumber}})
    const res = await axios.post(`http://localhost:8000/${url}`, obj);
    console.log(res);

    if(res.status === 201) return res;
    // if(res.status != 200) //console.log(res.status);
    else {
        try {
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    return res;
}


/*
משהו כאן הסתבך לי
אם כבר רשום צריך לבדוק
ואם לא רשום עדיין ובודקים זה נופל
*/
//