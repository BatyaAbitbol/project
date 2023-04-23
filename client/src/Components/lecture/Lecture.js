import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';
import { UseGetAllById, UseGetOneById } from "../../Hooks/useGetAxios"

const Lectures = (props) => {
    const [lectures, setLectures] = useState(null);
    const [course, setCourse] = useState();
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
            const resLectures = await UseGetAllById('lectures/student', courseStudent.id);
            setLectures(resLectures.data);
            setCourse(resCourse.data);
        }
        fetchData();
    }, []);

    const navigate = useNavigate();

    const productTemplate = (lectureByCourse) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="card flex flex-wrap justify-content-center align-items-end gap-2">
                    <Badge value={lectureByCourse.lectureNum} size="xlarge" severity="secondary" />
                </div>
                <video
                    defaultValue={lectureByCourse.video}
                    value={lectureByCourse.video}
                    player='mp4'
                    controls={true}
                    width="420"
                    height="250"
                    onPlay={() => console.log('MP4 Started Playing')}
                    onPause={() => console.log('MP4 Stopped Playing')}
                ></video>
                <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                    <Button icon="pi pi-file" className="p-button p-button-rounded" label="task" severity="info" onClick={(e) => { console.log("TASK"); }} />
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