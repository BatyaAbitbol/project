import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UseGetAllById } from '../../services/useGetAxios'
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import questionImage from '../../images/questions.jpg';//client\src\images\questions.jpg
import Menu from '../menu/menu';
import { Image } from 'primereact/image';

export default function ViewQuestionForTeacher() {
    
    const msgs = useRef(null);

    const msg1 =
        <div >
            In order to produce tests, you need to create a sufficiently large pool of questions,
            so that the randomization of producing a test for each student will carried out with maximum efficiency.
        </div>;

    useEffect(() => {
        msgs.current.show([
            {sticky: true, severity: 'info', summary: '', detail: 'In order to produce tests, you need to create a sufficiently large pool of questions, that the randomization of producing a test for each student will carried out with maximum efficiency.', closable: false},
            {sticky: true, severity: 'warn', summary: '', detail: 'Maximum number of questions per course is limited to 100.', closable: false}        ]);
    }, []);

    const [questions, setQuestions] = useState([]);
    const columns = [
        // { field: 'course_Id', header: 'course_Id' },
        { field: 'Open_Close', header: 'Oepn_Close' },
        { field: 'Question', header: 'Question' },
        { field: 'scores', header: 'score' },
        { field: 'correctAnswer', header: 'correctAnswer' },
        { field: 'WrongAnswer1', header: 'WrongAnswer1' },
        { field: 'WrongAnswer2', header: 'WrongAnswer2' },
        { field: 'WrongAnswer3', header: 'WrongAnswer3' }

    ];
    const { courseId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {

        const table = [];
        const fetchData = async () => {
            const resQue = await UseGetAllById('questions/course', courseId);
            const question = resQue.data; //arr of questions
            let ans;
            // setQuestions(question)
            if (question) {
                for (let i = 0; i < question.length; i++) {
                    const resAns = await UseGetAllById('answers/questionId', question[i].id);
                    const row = {};
                    const answers = resAns.data;
                    let count = 1;
                    row.Question = question[i].text;
                    row.scores = question[i].scores;
                    row.course_Id = question[i].courseId;
                    row.Open_Close = question[i].isClosed == 1 ? "close" : "open";
                    for (let j = 0; j < answers.length; j++) {
                        if (question[i].isClosed) {
                            if (answers[j].isCorrect) {
                                row.correctAnswer = answers[j].text
                            }
                            else {
                                if (count == 1) {
                                    row.WrongAnswer1 = answers[j].text
                                    count = count + 1;
                                }
                                else if (count == 2) {
                                    row.WrongAnswer2 = answers[j].text
                                    count = count + 1;
                                }
                                else {
                                    row.WrongAnswer3 = answers[j].text
                                    count = count + 1;
                                }
                            }
                        }
                        else {
                            row.correctAnswer = answers[j].text;
                        }
                        console.log(row);

                    }
                    table.push(row)
                }
            }
            setQuestions(table);
        };
        fetchData();
    }, []);

    console.log(questions.length != 0);
    return (
        <>
            <div className='card'>
                <Menu />
                {questions.length > 0 &&
                    <div className="card">
                        <DataTable value={questions} tableStyle={{ minWidth: '50rem' }}>
                            {columns.map((col, i) => (
                                <Column key={col.field} field={col.field} header={col.header} onClick={() => {navigate('edit')}} />
                            ))}
                        </DataTable>
                    </div>}
                <div className="card flex justify-content-center">
                    <Messages ref={msgs} />
                </div>
                <div className="card flex justify-content-center">
                    <Image src={questionImage} width="80%" />
                </div>
                <Button label="Add Question" onClick={() => navigate(`/questions/add/${courseId}`)} />
            </div>
        </>
    );
}