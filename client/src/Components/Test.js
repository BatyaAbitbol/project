import { useEffect, useState } from 'react';
import { UseGetAllById, UseGetOneById } from '../Hooks/useGetAxios';
import { UseCreate } from '../Hooks/usePostAxios';

const Test = (props) => {

    const [test, setTest] = useState(null);

    useEffect(() => {
        const obj = { courseStudentId: props.courseStudentId };
        UseCreate('tests', obj)
            .then(res => {
                console.log(res);
                setTest(res);
            })
    }, [])

    return (
        <>
            <h1>Test</h1>
        </>
    )
}

export default Test;

// http://localhost:8000/questions/course/:id
// questions by courseId

// http://localhost:8000/test_courses/course/:id
// test for course - numOfQuestions

// http://localhost:8000/tests - post = createTest body: courseStudentId