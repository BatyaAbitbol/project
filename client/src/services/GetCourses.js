import { useGetAll } from "../Hooks/useGetAxios";

export async function GetAllCourses() {
    try {
        return useGetAll('courses');
    } catch (error) {
        return error;
    }
}