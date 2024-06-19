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
import { useNavigate, useParams } from 'react-router-dom';
import { UseCreate } from '../../services/usePostAxios';
import { UseGetOneByParmas } from '../../services/useGetAxios';
import '../lecture/uploadLectures'


export default function AddCourse(props) {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [formData, setFormData] = useState({});

    const validate = (data) => {
        let errors = {};
        if (!data.price) {
            errors.price = 'Price is required.';
        }
        if (!data.name) {
            errors.name = 'name is required.';
        }
        if (!data.accessPeriod) {
            errors.accessPeriod = 'period is required.';
        }
        if (!data.description) {
            errors.description = 'description is required.';

        } if (!data.numOfLecture) {
            errors.numOfLecture = 'num of lectures is required.';
        }
        if (!data.accept) {
            errors.accept = 'You need to agree the terms and conditions.';
        }
        return errors;
    };


    const onSubmit = async (data, form) => {
        setFormData(data);
        form.restart();
        await HandleClick(data);
        setShowMessage(true);
        setShowErrorMessage(false);
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => { setShowMessage(false); navigate(`/courses`) ;}} /></div>;
    const errorDialodFooter = <div className='flex justify-content-center'><Button label='OK' className='p-button-text' autoFocus onClick={() => { setShowErrorMessage(false); }}
    />


    </div>;
    const navigate = useNavigate();

    async function HandleClick(data) {
        const teacherId = JSON.parse(localStorage.getItem('userInfo')).id;//!!!!!!!check
        console.log(localStorage.getItem('userInfo'));
        const obj = {
            name: data.name,
            teacherId: teacherId,
            description: data.description,
            categoryId: data.categoryId,
            accessPeriod: data.accessPeriod,
            price: data.price,
            numOfLectures: data.numOfLecture
        }
        if (JSON.parse(localStorage.getItem('userInfo')).status) {
            const res = await UseCreate('courses', obj);
            console.log(res);
            if (res.status && res.status === 201) {
                const courseId = res.data.id;
                const numLectures = data.numOfLecture;
                console.log(numLectures);
                setMessage(<>
                    <h5>create course</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        <b>
                            <Button label="payment" className="mt-2" text onClick={() => navigate(`/addCourse/payment/${numLectures}`)} />
                        </b><br />
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
        }
        else {
            setMessage(<>
                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>Sorry, you don't have permission<br /></p>
            </>)
            setShowErrorMessage(true);
        }
    }


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
                        {message}
                    </p>
                </div>
            </Dialog>
            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">Add Course</h2>
                    <h4 className="text-center">price: Each lecture plus 500</h4>
                    <Form onSubmit={onSubmit} initialValues={{ accept: false }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>name of course*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/* <Field name="category" render={({ input, meta }) => (
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="categoryId" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="category" className={classNames({ 'p-error': isFormFieldValid(meta) })}>category*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} /> */}
                            <Field name="accessPeriod" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="accessPeriod" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="period" className={classNames({ 'p-error': isFormFieldValid(meta) })}>period*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="numOfLecture" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="numOfLecture" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="numOfLecture" className={classNames({ 'p-error': isFormFieldValid(meta) })}>number of lectures*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            
                            <Field name="price" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="price" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="price" className={classNames({ 'p-error': isFormFieldValid(meta) })}>price*</label>
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
                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
                                </div>
                            )} />
                            {/* <Button type="submit" label="Upload Lectures " className="mt-2"  onClick={(e) => { navigate(`uploadLectures/${courseId}`) }}/> */}
                            {/* <Button type="submit" label="Create test" className="mt-2" /> */}
                            <Button type="submit" label="OK" className="mt-2" />

                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}
