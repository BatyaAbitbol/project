import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseGetOneById, UseGetAllById } from "../Hooks/useGetAxios";
import { Editor } from "primereact/editor";
import { RadioButton } from "primereact/radiobutton";

const Answer = (props) => {

    // const { questionId } = useParams();
    const questionId = props.questionId;

    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState();
    const [answer, setAnswer] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const resQuestion = await UseGetOneById('questions', questionId);
            if (resQuestion.status && resQuestion.status === 200) {
                setQuestion(resQuestion.data);
            }
        }
        fetchData();
    }, [])
    // const _answers = [
    //     { name: 'Accounting', key: 'A' },
    //     { name: 'Marketing', key: 'M' },
    //     { name: 'Production', key: 'P' },
    //     { name: 'Research', key: 'R' }
    // ];


    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            const resAnswers = await UseGetAllById('answers/questionId', questionId);
            if (resAnswers.status && resAnswers.status === 200) {
                setAnswers(resAnswers.data.map(e => { return { text: e.text, id: e.id } }));
            }
        }
        fetchData();
    }, [])

    return (
        <>
            {question && !question.isClosed &&
                <div className="card">
                    <Editor
                        value={answer}
                        onTextChange={(e) => {
                            setAnswer(e.htmlValue);
                            props.setAnswersCallBack(e.htmlValue)
                        }}
                        style={{ height: '320px' }}
                    />
                </div>}
            {question && question.isClosed &&
                <div className="card flex justify-content-center">
                    <div className="flex flex-column gap-3">
                        {answers && answers.map((ans) => {
                            return (
                                <div key={ans.id} className="flex align-items-center">
                                    <RadioButton
                                        name={questionId}
                                        inputId={ans.id}
                                        value={ans}
                                        onChange={(e) => {
                                            console.log('ON CHANGE');
                                            setAnswer(e.value);
                                            props.setAnswersCallBack(e.value);
                                            console.log(e);
                                        }}
                                        checked={answer && answer.id === ans.id}
                                    />
                                    <label htmlFor={ans.id} className="ml-2">{ans.text}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }
        </>
    )
}

export default Answer;