import axios from "axios";

export async function GetAllCourses(url){
    try {
        const res = await axios.get(`http://localhost:8000/${url}`, {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
        return res;
    } catch(err) {
        console.log(err);
        return err;
    }
}
// export async function useGetAll