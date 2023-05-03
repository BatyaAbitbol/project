import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';
import { UseCreate } from '../../Hooks/usePostAxios';

const StudentTest = (props) => {

    const user = JSON.parse(localStorage.getItem('userInfo'));
    const courseStudentId = props.courseStudentId;

    const [test, setTest] = useState({});
    const [questions, setQuestions] = useState();
    // const [answers, setAnswers]
    useEffect(() => {
        const fetchData = async () => {
            const res = await UseCreate('tests', { courseStudentId: courseStudentId });
            console.log(res);
            setTest(res.data);
            setQuestions(res.data.map(e => e.question));
        }
        fetchData();
    }, []);

    console.log(questions);

    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <Panel header={`Question #${1}`} toggleable>
                    <p className="m-0">{product.name}</p>
                </Panel>
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag
                                    value={product.inventoryStatus}
                                ></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button
                                icon="pi pi-shopping-cart"
                                className="p-button-rounded"
                                disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataView
                value={questions}
                itemTemplate={itemTemplate}
                paginator
                rows={5}
            />
        </div>
    );
}

export default StudentTest;