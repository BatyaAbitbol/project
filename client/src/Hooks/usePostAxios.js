import axios from 'axios';
// import { UseSignIn } from './UseGetStudent';

export async function useSignUp(url, obj) {
    // const res = await axios.get(`http://localhost:8000/${url}`, {params: {idNumber: obj.idNumber}})
    // if(res.status === 404) //console.log(res.status);
    // // if(res.status === 200)
    // // קודם יש לבדק אם כבר קיים שלא תהיה קריסת שרת של רישום כפול 
    // // const res = await UseSignIn(url, obj);
    //  {
        try {
            const res = await axios.post(`http://localhost:8000/${url}`, obj);
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    // }
    // return res;
}


/*
משהו כאן הסתבך לי
אם כבר רשום צריך לבדוק
ואם לא רשום עדיין ובודקים זה נופל
*/
