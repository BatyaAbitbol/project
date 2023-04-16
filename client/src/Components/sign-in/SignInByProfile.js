import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react"
import { Form, Field } from "react-final-form";
import { Password } from 'primereact/password';
import { UseSignIn } from "../../Hooks/UseGetStudent";
import { useNavigate } from 'react-router-dom';

export function SignInByProfile(props) {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(<></>);
    const [formData, setFormData] = useState({});
    const validate = (data) => {
        let errors = {};
        if (!data.idNumber) {
            errors.idNumber = 'ID Number is required.';
        }
        else if (data.idNumber.length != 9 || !/^\d+$/.test(data.idNumber)) {
            errors.idNumber = 'ID Number is invalid.'
        }
        if (!data.password) {
            errors.password = 'Password is required.'
        }
        else if (data.password.length < 8 || data.password.length > 12) {
            errors.password = 'Password is invalid.'
        }
        return errors;
    };
    const onSubmit = async (data, form) => {
        setFormData(data);
        setShowMessage(true);
        form.restart();
        await HandleClick(data);
    }

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const navigate = useNavigate();
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => { setShowMessage(false); navigate('/home/home-student'); }
    } /></div>;
    async function HandleClick(data) {
        const obj = {
            idNumber: data.idNumber,
            password: data.password
        }
        let url;
        if (props.profile === 'Student') url = 'students';
        else if (props.profile === 'Teacher') url = 'teachers';
        try {
            const res = await UseSignIn(url, obj);
            if(res.status && res.status === 200) {
                localStorage.setItem('token', JSON.stringify(res.data.accessToken));
                setMessage(<>
                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>You are in!</h5>
                </>)
            }
            else{
                setShowErrorMessage(true);
                setErrorMessage(<>
                    <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>Incorrect details.</h5>
                </>)
            }
        } catch (error) {
            console.log(error);
            //
        }
    }
    return (
        <>
            <div className="form-demo">
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position='top' footer={dialogFooter} showHeader={false} style={{ width: '30vw' }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        {message}
                    </div>
                </Dialog>

                <div className="flex justify-content-center">
                    <div className="card">
                        <h4 className="text-center">Sign In {props.profile}</h4>
                        <Form onSubmit={onSubmit} initialValues={{ idNumber: '', password: '' }} validate={validate} render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className='p-fluid'>
                                <Field name="idNumber" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id='idNumber' {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="idNumber" className={classNames({ 'p-error': isFormFieldValid(meta) })}>ID Number*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                                />
                                <Field name="password" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="password" {...input} feedback={false} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <Button type="submit" label="Sign In" className="mt-2" />
                            </form>
                        )} />
                    </div>
                </div>
            </div>
        </>
    )
}