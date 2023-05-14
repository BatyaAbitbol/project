import { TabMenu } from 'primereact/tabmenu';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import icon from '../../images/logo-school.ico'

export default function Menu(props) {

    const [showEditMsg, setShowEditMsg] = useState(false);

    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let userName, userIcon, userProfile;
    userInfo.status == 'teachers' ? userName = userInfo.name : userName = userInfo.firstName + ' ' + userInfo.lastName;
    userInfo.status == 'teachers' ? userIcon = 'pi pi-user-plus' : userIcon = 'pi pi-fw pi-user';
    userInfo.status == 'teachers' ? userProfile = 'Teacher' : userProfile = 'Student';
    const items = [
        {
            label: 'My profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: userName,
                    icon:  userIcon
                },
                {
                    label: userProfile,
                    icon: userIcon
                }
                // update user --> await Update(`{userInfo.status}`, user);
                // --------------------------------------------------------
                // ,
                // {
                //     label: 'Edit profile',
                //     icon: 'pi pi-user-edit',
                //     command: () => { setShowEditMsg(true) }
                // }
            ]
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => { navigate(`/home-${userInfo.status}`) }
        },

        {
            label: 'All Courses',
            icon: 'pi pi-list',
            command: () => { navigate('/courses') }
        },
        {
            label: 'My Courses',
            icon: 'pi pi-fw pi-bookmark',
            command: () => { navigate(`/courses/${userInfo.status}/my-courses`) }

        },
        {
            label: 'Exams',
            icon: 'pi pi-pencil',
            command: () => { navigate('/test') }
        }, {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            command: () => { logout() }
        }

    ];

    const start = <img alt="logo" src={icon} height="40" className="mr-2"></img>;
    // const end = <InputText placeholder="Search" type="text" className="w-full" />;

    const logout = () => {
        navigate('/');
        localStorage.clear();
    }
    return (
        <Menubar model={items} start={start} /*end={end}*/ />
    )
}