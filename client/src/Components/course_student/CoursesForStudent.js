import { UseGetAllById, UseGetOneById } from "../../Hooks/useGetAxios";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useNavigate } from 'react-router-dom';
import { Lectures } from "../lecture/Lecture";

export function CoursesForStudent(props) {

    const [data, setData] = useState([]);
    const [course, setCourse] = useState(-1);
    const [layout, setLayout] = useState('grid');

    const id = JSON.parse(localStorage.getItem('studentInfo')).id;

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetAllById('students/courses', id);
            setData(res.data);
        }
        fetchData();
    }, [])

    const navigate = useNavigate();
    const listItem = (courseJoinedCourseStudent) => {
        const course = courseJoinedCourseStudent[0].course;
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={course.image} alt={course.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3" name={course.name} onClick={navigate(`${course.name}`)}>
                            <div className="text-2xl font-bold text-900">{course.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (courseJoinedCourseStudent) => {
        const course = courseJoinedCourseStudent[0].course;
        return (
            <div data-custom-id={course.id} className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div data-custom-id={course.id} className="p-4 border-1 surface-border surface-card border-round">
                    {/* ? איך אני יכולה לקבל מידע על איזה קורס לחצתי ולרנדר לפי זה קורס מתאים */}
                    <div data-custom-id={course.id} className="flex flex-column align-items-center gap-3 py-5" onClick={(e) => {
                        console.log(e.target.attributes[0].nodeValue);
                        const courseId = e.target.attributes[0].nodeValue;
                        setCourse(courseId);
                    }}>
                        <img data-custom-id={course.id} className="w-9 shadow-2 border-round" src={course.image} alt={course.name} />
                        <div data-custom-id={course.id} className="text-2xl font-bold">{course.name}</div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (course, layout) => {
        if (!course) {
            return;
        }

        if (layout === 'list') return listItem(course);
        else if (layout === 'grid') return gridItem(course);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <>
            {course != -1 && <Lectures courseId={course} />}
            <div className="card">
                <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold' }}>My Courses</div>
                <DataView value={data} itemTemplate={itemTemplate} layout={layout} header={header()} />
            </div>
        </>
    )
}
