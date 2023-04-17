import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useNavigate } from 'react-router-dom';

import "primereact/resources/primereact.min.css";
import 'primereact/resources/primereact.css';

export default function Start(props) {

    const navigate = useNavigate();
    return (
        <>
            {/* <div className="card flex justify-content-center">
                </div> */}
                <div className="card flex flex-wrap justify-content-center gap-3">
                    
                    <Button onClick={() => { navigate('/sign-in') }} label="Sign In" text raised />
                    <Button onClick={() => { navigate('/sign-up') }} label="Sign Up" text raised />
                </div>
        </>
    )
}