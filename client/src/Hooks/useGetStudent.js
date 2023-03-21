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

export async function UseSignIn(profile, params) {
    console.log(params);
    let url;
    if (profile == 'Teacher')
        url = 'http://localhost:8000/teachers/login';
    else if (profile == 'Student') url = 'http://localhost:8000/students/login'
    try {
        const res = await axios.get(url, params);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

// useEffect(() => {
//     useGetData('students');
// }, [])