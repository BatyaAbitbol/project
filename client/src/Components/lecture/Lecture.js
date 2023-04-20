import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';
import { UseGetAllById } from "../../Hooks/useGetAxios"

const Lectures = (props) => {
    const [lectures, setLectures] = useState(null)
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
            const coursesForStudent = res.data;
            const courseStudent = coursesForStudent.filter((x) => x.courseId = courseId)[0];
            const resLectures = await UseGetAllById('lectures/student', courseStudent.id);
            console.log(resLectures.data);
            setLectures(resLectures.data)
        }
        fetchData()
    }, []);

    const navigate = useNavigate();

    const productTemplate = (lectureByCourse) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    {/* <img src={`https://primefaces.org/cdn/primereact/images/lectureByCourseent/${lectureByCourseent.image}`} alt={lectureByCourseent.name} className="w-6 shadow-2" /> */}
                </div>
                <div>
                    <h4 className="mb-1">{lectureByCourse.lectureNum}</h4>
                    <h2 className="mt-0 mb-3">${lectureByCourse.video}</h2>
                    {/* <Tag value={lectureByCourseent.inventoryStatus} severity={getSeverity(lectureByCourseent)}></Tag> */}
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" label="task" onClick={(e) => { navigate('/task-for-course-student'); console.log((e)); }} />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" label="video" onClick={(e) => { navigate('/video-for-course-student'); console.log((e)); }} />

                    </div>
                </div>
            </div>
        );
    };

    return (
        <>        
            <h1>Lectures of courseId {props.courseId}</h1>
            <div className="card">
            <Carousel value={lectures} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
            </div>
        </>
    )
}
export default Lectures;
