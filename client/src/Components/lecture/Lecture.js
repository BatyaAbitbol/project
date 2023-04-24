import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { UseGetAll, UseGetAllById, UseGetOneById } from "../../Hooks/useGetAxios";
import { Task } from '../task/Task';

const Lectures = (props) => {
    const [lectures, setLectures] = useState(null);
    const [course, setCourse] = useState();
    const [visible, setVisible] = useState(false);
    const [lectureId, setLectureId] = useState(null);
    const [next, setNext] = useState(0);
    // const [task, setTask] = useState(null);

    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    //indByLectureId לרוץ על רשימת ההרצאות ובכל איטרציה לשלוח לשרת עם הקורססטודנט 
    //מביא את ההרצאות של הקורס תלמיד המסוים
    useEffect(() => {
        const fetchData = async () => {
            let id;
            const studentId = JSON.parse(localStorage.getItem('studentInfo')).id;
            const courseId = props.courseId;
            const res = await UseGetAllById('course_students/student', studentId);
            const resCourse = await UseGetOneById('courses', courseId);
            const coursesForStudent = res.data;
            const courseStudent = coursesForStudent.filter((x) => x.courseId = courseId)[0];
            // const resLectures = await UseGetAllById('lectures/student', courseStudent.id);
            const resLectures = await UseGetAllById('lectures/course', courseId);
            setNext(courseStudent.nextLectureNum);
            setLectures(resLectures.data);
            setCourse(resCourse.data);
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await UseGetOneById('tasks/lecture', lectureId);
    //         console.log(res);
    //         if(res.data)
    //             setTask(res.data)
    //     }
    //     fetchData();
    // }, [lectureId])
    const navigate = useNavigate();

    const productTemplate = (lectureByCourse) => {
        console.log(lectureByCourse.lectureNum);
        console.log(lectureByCourse.lectureNum <= next);
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="card flex flex-wrap justify-content-center align-items-end gap-2">
                    <Badge value={lectureByCourse.lectureNum} size="xlarge" severity="secondary" />
                    {lectureByCourse.lectureNum <= next && <Badge value={<i className="pi pi-check-circle" style={{ fontSize: '2rem', color: 'white' }}></i>} size="xlarge" severity="success" />}
                </div>
                <video
                    value="https://www.w3schools.com/html/mov_bbb.mp4"//{lectureByCourse.video}
                    player='mp4'
                    controls={true}
                    width="420"
                    height="250"
                    onPlay={() => console.log('MP4 Started Playing')}
                    onPause={() => console.log('MP4 Stopped Playing')}
                ></video>
                <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                    <Button id={lectureByCourse.id} icon="pi pi-file" className="p-button p-button-rounded" label="task" severity="info"
                        onClick={(e) => {
                            setLectureId(lectureByCourse.id);
                            console.log(lectureId);
                            setVisible(true);
                            // navigate('/task')
                        }} />
                    <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                        <Task lectureId={lectureId} />
                    </Dialog>
                </div>
            </div>
        );
    };

    return (
        <>{lectures &&
            <>
                <div className="card">
                    <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold', color: 'gray' }}>Lectures Of {course.name} Course</div>
                    <Carousel value={lectures} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
                </div>
            </>
        }
        </>
    )
}
export default Lectures;