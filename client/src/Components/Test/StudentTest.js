import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';

import { UseCreate } from '../../Hooks/usePostAxios';
import { useParams } from 'react-router-dom';
import Answer from '../Answer';
import { UseUpdate } from '../../Hooks/UsePutAxios';

const StudentTest = (props) => {

    const { courseStudentId } = useParams();

    const user = JSON.parse(localStorage.getItem('userInfo'));

    const [test, setTest] = useState({});
    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState();
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseCreate('tests', { courseStudentId: courseStudentId });
            setTest(res.data);
            setQuestions(res.data.map(e => e.question));
            localStorage.setItem('test',JSON.stringify(res.data));
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const obj = {
                test : {
                    testId: test.id,
                    
                }
            }
            const res = await UseUpdate(`tests/submit`, )
        }
        fetchData();
    }, [submit])
    const getSeverity = (question) => {
        if (question.scores <= 5)
            return 'success';
        if (question.scores <= 10)
            return 'warning';
        if (question.scores > 10)
            return 'danger';
        else return null;
    };

    const setAnswersCallBack = (ans) => {
        let arr;
        if(!answers)
            arr = []
        else arr = [...answers];
        arr.push(ans);       
        setAnswers([...arr]);
    }
    let count = 0;        

    const itemTemplate = (question) => {
        return (

            <div className="col-12">
                <Panel header={`Question #${count}`} toggleable>
                    <p className="m-0">{question.text}</p>
                    <Tag
                        value={question.scores}
                        severity={getSeverity(question)}
                    ></Tag>
                    <Answer questionId={question.id} setAnswersCallBack={setAnswersCallBack} />
                </Panel>
            </div>
        );
    };

    const submitTest = () => {
        console.log(answers);
        setSubmit(true);
    }

    return (
        <div className="card">
            <DataView
                value={questions}
                itemTemplate={itemTemplate}
                paginator
                rows={5}
            />
            <br />
            <div className="card flex justify-content-center">
                <Button label='Submit' icon='pi pi-submit' onClick={submitTest}/>
            </div>
        </div>
    );
}

export default StudentTest;