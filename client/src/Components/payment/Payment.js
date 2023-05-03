import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { UseCreate } from "../../Hooks/usePostAxios";

export function Payment(props) {
    
    const {courseId} = useParams();
    const navigate = useNavigate();

    const registerToCourse = () => {
        const obj = {
            studentId: JSON.parse(localStorage.getItem('userInfo')).id,
            courseId: courseId,
            registerDate: new Date(),
            nextLectureNum: 1
        }
        const register = async () => {
            const res = await UseCreate('course_students', obj);
            if (res.status == 201){
                console.log('נרשמת בהצלחה');
                navigate('/student/courses')
            }
            else {
                console.log(res.response.data.message);
                navigate('/courses')
            }
        }
        register();
    }
    return (
        <>
            <div className="card">
                <Button label="OK" onClick={(e) => {
                    registerToCourse();
                }}/>
            </div>
        </>
    )
}