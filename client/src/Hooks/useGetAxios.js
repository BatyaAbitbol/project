import axios from "axios";

const URL = `http://localhost:8000`;

export async function GetAllCourses(url){
    try {
        const res = await axios.get(`${URL}/${url}`, {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
        return res;
    } catch(err) {
        console.log(err);
        return err;
    }
}

export async function UseGetAll(url){
    try {
        const res = await axios.get(`${URL}/${url}`, {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
        console.log(res);
        return res;
    } catch(err) {
        console.log(err);
        return err;
    }
}

export async function UseGetOne(url, params) {
    try {
        const res = axios.get(`${URL}/${url}`, {headers:{Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
    } catch (error) {
        return error;
    }
}
// export async function useGetAll

