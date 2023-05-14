import { FileUpload } from 'primereact/fileupload';
import React, { useRef, useState } from "react";

export default function UploadLecture(props) {
    let base64data = "";
    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            base64data = reader.result;
        }
        console.log(base64data);
    }
    
    return (<>
        <FileUpload
            name="demo[]"
            url={'/api/upload'}
            multiple accept="image/*"
            customUpload
            uploadHandler={customBase64Uploader}
            maxFileSize={10000000}
            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
    </>)
}