// בסיעתא דשמיא
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { UseCreate } from '../../Hooks/usePostAxios';
import { UseGetOneByParmas } from '../../Hooks/useGetAxios';
import '../lecture/uploadLectures'


export default function AddCourse(props) {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [formData, setFormData] = useState({});

    const validate = (data) => {
        let errors = {};
        //     if (!data.firstName) {
        //         errors.firstName = 'First Name is required.';
        //     }
        //     if (!data.lastName) {
        //         errors.lastName = 'Last Name is required.';
        //     }
        //     if (!data.email) {
        //         errors.email = 'Email is required.';
        //     }
        //     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        //         errors.email = 'Invalid email address. E.g. example@email.com';
        //     }
        //     if (!data.password) {
        //         errors.password = 'Password is required.';
        //     }
        //     else if (data.password.length < 8 || data.password.length > 12) {
        //         errors.password = 'Password length is at least 8 and at most 12.';
        //     }
        //     if (!data.idNumber) {
        //         errors.idNumber = 'ID number is required.';
        //     }
        //     else if (data.idNumber.length !== 9 || !/^\d+$/.test(data.idNumber)) {
        //         errors.idNumber = 'ID Number is invalid.'
        //     }
        //     if (!data.accept) {
        //         errors.accept = 'You need to agree to the terms and conditions.';
        //     }
        //     return errors;
        // };
    }

    const onSubmit = async (data, form) => {
        setFormData(data);
        form.restart();
        await HandleClick(data);
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => { setShowMessage(false); /*navigate('/sign-in');*/ }} /></div>;
    const errorDialodFooter = <div className='flex justify-content-center'><Button label='OK' className='p-button-text' autoFocus onClick={() => { setShowErrorMessage(false); /*navigate('/sign-in');*/ }} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );
    const navigate = useNavigate();
    async function HandleClick(data) {

        // console.log(data.teacherName);
        // const res1= await UseGetOneByParmas('teachers',data.teacherName);
        // console.log(res1);
        const obj = {
            name: data.name,
            teacherId: 1,
            description: data.description,
            categoryId: data.categoryId,
            accessPeriod: data.accessPeriod,
            price: data.price,
            numOfLecture: data.numOfLecture
        }
        const res = await UseCreate('courses', obj);
        if (res.status && res.status === 201) {
            // localStorage.setItem('token', JSON.stringify(res.data.accessToken));
            // localStorage.setItem('course', JSON.stringify(res.data.data));
            setMessage(<>
                <h5>Registration Successful!</h5>
                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                    Your account is registered under name <b>{data.name} {data.teacherId}</b>.<br />Please check ?????? for activation instructions.
                </p>
            </>)
            setShowMessage(true);
        }
        else if (res.status && res.status === 200) {
            setMessage(<>
                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>There is already a course with the same name.<br /></p>
            </>)
            setShowErrorMessage(true);
        }
        // why - ??? it still does not work out.
        else if (res.response && res.response.data.message === 'Duplicate student') {
            setMessage(<>
                <h5>You Are Signed Up already!</h5>
            </>)
        }
        else {
            setErrorMessage(res.message);
            setShowErrorMessage(true);
        }
    };

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    {message}
                </div>
            </Dialog>
            <Dialog visible={showErrorMessage} onHide={() => setShowErrorMessage(false)} position="top" footer={errorDialodFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>Failed Registration</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        {/* Your registration failed because of some errors that occured. Error Description: <b>{errorMessage}</b><br />You should try again. */}
                        {message}
                    </p>
                </div>
            </Dialog>
            <div className="flex justify-content-center">
                <div className="card">
                    <h4 className="text-center">Add Course</h4>
                    <Form onSubmit={onSubmit} initialValues={{ firstName: '', lastName: '', email: '', password: '', idNumber: '', accept: false }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field name="name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>name of course*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="category" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="categoryId" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>category*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="period" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="accessPeriod" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="ID number" className={classNames({ 'p-error': isFormFieldValid(meta) })}>period*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="number of lectures" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="numOfLecture" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>number of lectures*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="price" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="price" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>price*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="description" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="description" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>description*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/* <Field name="teacherName" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id="teacher name" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>teacher name*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} /> */}
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
                                </div>
                            )} />
                            <Button type="submit" label="Upload Lectures " className="mt-2" onClick={(e) => { navigate('/uploadLectures') }} />
                            {/* <Button type="submit" label="Create test" className="mt-2" /> */}
                            <Button type="submit" label="OK" className="mt-2" />

                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}
