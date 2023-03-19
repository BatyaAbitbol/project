import React, { useState } from "react";
import { InputText, Password } from 'primereact';
import { Button } from "primereact/button";
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function SignUpStudents(props) {

    const [user, setUser] = useState([]);

    const handleChange = (selected, key) => {
        setUser((prev) => ({ ...prev, [key]: selected }));
    }

    const navigate = useNavigate();
    return (
        <>
            <form
                id='sign-up-student'
            >
                <Button
                    id='profileTeachers'
                    onClick={(e) => { navigate('/sign-up/teacher') }}
                    icon={FaChalkboardTeacher}
                    label='Teacher'
                />
                <Button
                    id='profileStudents'
                    onClick={(e) => { navigate('/sign-up/student') }}
                    icon='pi pi-user'
                    label='Student'
                />
                <br />
                <InputText
                    id='firstName'
                    name='firstName'
                    placeholder='First Name'
                    onChange={(e) => { handleChange(e.target.value, 'firstName') }}
                />
                <br />
                <InputText
                    id='lastName'
                    name='lastName'
                    placeholder='Last Name'
                    onChange={(e) => { handleChange(e.target.value, 'lastName') }}
                />
                <br />
                <InputText
                    id='email'
                    name='email'
                    placeholder='Email'
                    onChange={(e) => { handleChange(e.target.value, 'email') }}
                />
                <br />
                <InputText
                    id='idNumber'
                    name='idNumber'
                    placeholder='ID Number'
                    onChange={(e) => { handleChange(e.target.value, 'idNumber') }}
                />
                <br />
                <Password
                    id='password'
                    name='password'
                    placeholder='Create Your Password'
                    onChange={(e) => { handleChange(e.target.value, 'password') }}
                    feedback={true}
                />
                <br />
                <Button>Take Me A Picture!</Button>
                <br />
                <Button onClick={(e) => { console.log('Clicked'); }} icon='pi pi-sign-up'>Sign Up</Button>
            </form>        
        </>
    )
}