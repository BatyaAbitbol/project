import axios from 'axios';
import useAxios from 'axios-hooks';

export default async function useGetStudent(url, user) {

    const [{ data, loading, error }, refetch] = useAxios(url, user);
    // const res = await axios.get(url, user);
    if (data) {
        console.log(data);
        return JSON.stringify(data);
    }
    if (loading) return loading;
    if (error) return error;

}