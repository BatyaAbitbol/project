import axios from 'axios';
import { useEffect } from 'react';

export async function UseGetData() {

    try {
        const res = await axios.get(`http://localhost:8000/students`)
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

export async function UseLogin(params) {
   try {
        const res = await axios.get(`http://localhost:8000/students/login`, params);
        console.log(res);
   } catch (error) {
    console.log(error);
}
}

// useEffect(() => {
//     useGetData('students');
// }, [])