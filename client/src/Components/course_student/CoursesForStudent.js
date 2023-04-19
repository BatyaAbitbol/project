import { UseGetAllById, UseGetOneById } from "../../Hooks/useGetAxios";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import {useNavigate} from 'react-router-dom';

export function CoursesForStudent(props) {

    const [data, setData] = useState([]);
    const [courses, setCourses] = useState([]);
    const [layout, setLayout] = useState('grid');

    const id = JSON.parse(localStorage.getItem('studentInfo')).id;
    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetAllById('course_students/student', id);
            setData(res.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res  = await data.forEach(async (e) => {
                const res = await UseGetOneById('students/courses', id);
            });
            setCourses(res.data);
            console.log(res);
        }
        fetchData();
    }, [data])

    console.log(courses);
    console.log(data);

    const temp = [{"name": "Batya"}];
    const navigate = useNavigate();
    const listItem = (course) => {
        return (                       
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={linearImg} alt={course.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{course.name}</div>
                            <div className="text-2xl font-bold">{course.description}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{course.categoryId}</span>
                                </span>
                                {/* <Tag value={course.inventoryStatus} severity={getSeverity(course)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">{course.price} $</span>
                            <Button icon="pi pi-tag" className="p-button-rounded" label="Buy It!" onClick={(e) => {navigate('/course/payment')}}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (course) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{course.categoryId}</span>
                        </div>
                        {/* <Tag value={course.inventoryStatus} severity={getSeverity(course)}></Tag> */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                    
                        {/* <img className="w-9 shadow-2 border-round" src={course.image} alt={course.name} /> */}
                        <div className="text-2xl font-bold">{course.name}</div>
                        <div className="text-2xl font-bold">{course.description}</div>
                        {/* <Rating value={course.rating} readOnly cancel={false}></Rating> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{course.price} $</span>
                        <Button icon="pi pi-tag" className="p-button-rounded" label="Buy It!" onClick={(e) => {navigate('/course/payment'); console.log((e));}}></Button>
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
        <div className="card">
          <div  style={{textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold'}}>our courses</div>
            <DataView value={courses} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div>
    )
    }
    
