// import React, { useEffect } from "react";
import useGetStudent from "../../Hooks/useGetStudent";
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';

export default function SignIn(props) {
    const toast = useRef(null);

    const show = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Form Submitted',
            detail: formik.values.value,
        });
    };

    const formik = useFormik({
        initialValues: {
            value: '',
            password: '',
            error: '',
        },
        validate: (data) => {
            console.log(data);
            // data.value.length < 9
            let errors = {};

            if (!data.password) {
                errors.error = 'Password is required.'
            }
            if (!data.value) {
                console.log(!data.password);
                if (!data.password) {
                    errors.error = 'All fields are required!';
                } else errors.value = 'ID Numder is required.';
                // errors.password = 'Password is required'
            }
            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
        },
    });

    const isFormFieldInvalid = (name) =>
        !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? (
            <small className="p-error">{formik.errors[name]}</small>
        ) : (
            <small className="p-error">&nbsp; </small>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <span className="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="value"
                        name="value"
                        value={formik.values.value}
                        onChange={(e) => {
                            formik.setFieldValue('value', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                    />
                    <label htmlFor="input_value">ID Number</label>
                </span>
                <br />
                <span className="p-float-label">
                    <Password
                        id="password"
                        name="password"
                        value={formik.values.password}
                        feedback={false}
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value);
                        }}
                        className={classNames({
                            'p-invalid': isFormFieldInvalid('password'),
                        })}
                    />
                    <label htmlFor="password_value">Password</label>
                </span>
                <br />
                {getFormErrorMessage('error')}
                {getFormErrorMessage('value')}
                {getFormErrorMessage('password')}
                <Button type="sign-in" label="Sign In" icon="pi pi-sign-in" />
            </form>
        </div>
    );
}
    // const user = {
    //     idNumber: "214185019",//props.idNumber,
    //     password: "B123"//props.password
    // }
    // const profile = "students"//props.profile;
    // const url = `https://localhost:8000/${profile}/login`;
    // const data = useGetStudent(url, user);
    // return (
    //     <>
    //         <h1>Sign In</h1>
    //         <div>{data.data}</div>
    //     </>
    // )
