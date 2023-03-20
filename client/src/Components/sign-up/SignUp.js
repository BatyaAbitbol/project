import { TabView, TabPanel } from 'primereact/tabview';
import SignUpStudents from './SignUpStudents';
import SignUpTeachers from './SignUpTeachers';
import {FaChalkboardTeacher} from 'react-icons/fa';
import './signup.css';

export function SignUp(props) {

    return (
        <>
            <div className='flex align-items-center flex-column pt-6 px-3'>
                <TabView>
                    <TabPanel rightIcon='pi pi-user'>
                        <SignUpStudents>

                        </SignUpStudents>
                    </TabPanel>
                    <TabPanel rightIcon='pi pi-user-plus'>
                        <SignUpTeachers/>
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}
/*
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
*/