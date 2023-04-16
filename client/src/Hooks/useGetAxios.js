import axios from "axios";

export async function useGetAll(url) {
    try {
        const res = await axios.get(`http://localhost:8000/${url}`, { headers: { Authorization: 'Bearer' + localStorage.getItem('token') } });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// export async function useGetAll