import { UseGetAll, UseGetAllById, UseGetOneById } from "../../Hooks/useGetAxios";
import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useNavigate } from 'react-router-dom';
import Lectures from "../lecture/Lecture";
import UserContext from "../UserContext";

export function CoursesForStudent(props) {

    const [data, setData] = useState(null);
    const [course, setCourse] = useState(-1);
    const [layout, setLayout] = useState('grid');

    const user = useContext(UserContext);
    console.log(user);
    const id = user.id;
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetAllById('students/courses', id);
            console.log(res)
            if (res.status != 204)
                setData(res.data);
            else setData(res.statusText)
        }
        fetchData();
    }, [])

    const navigate = useNavigate();
    const listItem = (courseJoinedCourseStudent) => {
        const course = courseJoinedCourseStudent[0].course;
        return (
            <div className="col-12">
                <div data-custom-id={course.id} className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img data-custom-id={course.id} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={course.image} alt={course.name} />
                    <div data-custom-id={course.id} className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
                        onClick={(e) => {
                            console.log(e.target.attributes[0].nodeValue);
                            const courseId = e.target.attributes[0].nodeValue;
                            setCourse(courseId);
                        }}>
                        <div data-custom-id={course.id} className="flex flex-column align-items-center sm:align-items-start gap-3" name={course.name} >
                            <div data-custom-id={course.id} className="text-2xl font-bold text-900">{course.name}</div>
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
                        console.log(course.id);

                        const courseId = course.id;
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

    let display;
    if (course != -1) {
        navigate(`/lectures/${course}`)
        // display = <Lectures courseId={course} />;
    }
    else {
        if (typeof data !== 'string') {
            display = <div className="card">
                <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold' }}>My Courses</div>
                <DataView value={data} itemTemplate={itemTemplate} layout={layout} header={header()} />
            </div>
        }
        else display = <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold' }}>{data}</div>
    }
    return (
        <>
            {/* {course != -1 && <Lectures courseId={course} />}
            {typeof data !== 'string' && <div className="card">
                <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold' }}>My Courses</div>
                <DataView value={data} itemTemplate={itemTemplate} layout={layout} header={header()} />
            </div>}
            {typeof data === 'string' && <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold' }}>{data}</div>
            } */}
            {display}
        </>
    )
}