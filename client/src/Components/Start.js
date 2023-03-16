import React, { useState } from 'react';
import { Button } from 'primereact/button';
import "primereact/resources/primereact.min.css";
import 'primereact/resources/primereact.css';

import SignIn from './signIn/SignIn';

export default function Start(props) {
    const [signIn, setSignIn] = useState(false);
    return (
        <>
            {signIn && <SignIn></SignIn>}
            {!signIn &&
                <div className="card flex flex-wrap justify-content-center gap-3">
                    <Button onClick={() => { setSignIn(true) }} label="Sign In" text raised />
                    <Button label="Sign Up" text raised />
                </div>
            }
        </>
    )
}