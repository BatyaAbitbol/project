import { useEffect, useState } from "react";
import { UseGetOneById } from "../../Hooks/useGetAxios";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { Field, Form } from 'react-final-form';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { UseCreate } from "../../Hooks/usePostAxios";
export function Task(props) {

    const [task, setTask] = useState(null);
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [showMessage, setShowMessage] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetOneById('tasks/lecture', props.lectureId);
            setTask(res.data)
        }
        fetchData();
    }, [])

    // לשנות אם הוגשה המטלה שהאדיטור יהיה רק לקריאה
    // ושיהיה איקון של וי

    const validate = () => {
        if (text === '') {
            setError(true);
        }
        else setError(false)
    };

    const submitTask = () => {
        const fetchData = async () => {
            const obj = {
                courseStudentId: props.courseStudentId,
                taskId: task.id,
                isDone: true,
                submitDate: new Date().toLocaleDateString()
            }
            const res = await UseCreate('tasks', task.id)
        }
        fetchData();
    }
    const navigate = useNavigate();
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => { setShowMessage(false); navigate(''); }} /></div>;

    return (
        <>
            {showMessage &&
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position='top' footer={dialogFooter} showHeader={false} style={{ width: '30vw' }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        {message}
                    </div>
                </Dialog>}
            <div className="flex justify-content-center">
                <div className="card">
                    <h3 className="text-center">Task - Let's Exercise</h3>
                    <p className="m-0">
                        {task && task.taskFile}
                    </p>
                    <br />
                    <Editor value={text} onTextChange={(e) => { setText(e.htmlValue) }} style={{ height: '320px' }} />
                    {error && <small className="p-error">You can not submit empty file.</small>}
                    <div className="card flex flex-wrap justify-content-center gap-3">
                        <Button type="submit" label="Submit" className="mt-2" icon="pi pi-check" onClick={(e) => {
                            validate(text);
                            !error && submitTask();
                        }} />
                        <Button label="Try it later" className="mt-2" icon="pi pi-paperclip" onClick={(e) => {
                            navigate('/home/home-student')
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}