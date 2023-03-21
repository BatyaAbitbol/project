import { TabView, TabPanel } from 'primereact/tabview';
import { SignInByProfile } from './SignInByProfile';

export function SignIn(props) {

    return (
        <>
            <div className='flex align-items-center flex-column pt-6 px-3'>
                <TabView>
                    <TabPanel rightIcon='pi pi-user'>
                        <SignInByProfile profile='Student'/>
                    </TabPanel>
                    <TabPanel rightIcon='pi pi-user-plus'>
                    <SignInByProfile  profile='Teacher'/>
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}
