import { TabView, TabPanel } from 'primereact/tabview';
import { SignInByProfile } from './SignInByProfile';

export function SignIn(props) {
    // setUserId={props.setUserId} setStatus={props.setStatus} 
    return (
        <>
            <div className='flex align-items-center flex-column pt-6 px-3'>
                <TabView>
                    <TabPanel rightIcon='pi pi-user'>
                        <SignInByProfile status='students' profile='Student' />
                    </TabPanel>
                    <TabPanel rightIcon='pi pi-user-plus'>
                        <SignInByProfile status='teachers' profile='Teacher' />
                    </TabPanel>
                </TabView>
            </div>  
        </>
    )
}