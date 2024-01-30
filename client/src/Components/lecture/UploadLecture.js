import { FileUpload } from 'primereact/fileupload';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { UseCreate } from '../../services/usePostAxios';
import { Panel } from 'primereact/panel';
import { UseGetOneById } from '../../services/useGetAxios';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import { TaskTeacher } from '../task/TaskTeacher';
import Menu from '../menu/menu';

export default function UploadLecture(props) {
    const { courseId } = useParams();

    const [uploaded, setUploaded] = useState(false);
    const [encoded, setEncoded] = useState(false);
    const [base64data, setBase64Data] = useState("");
    const [lectureNum, setLectureNum] = useState(1);
    const [lectureId, setLectureId] = useState(1);
    const [visible, setVisible] = useState(false);
    const [src, setSrc] = useState("");

    const [vid, setVid] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetOneById('courses/lecture_num', courseId);
            console.log(res);
            if (res && res.status && res.status >= 200) {
                setLectureNum(res.data.lectureNum);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (base64data != "") {
            setEncoded(true);
        }
    }, [base64data]);

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            setBase64Data(reader.result);
        }
        console.log(base64data);
        handleUpload();
    }


    const handle = (event) => {
        try {
            // Get the uploaded file
            const file = event.files[0];

            setVid(file)



            // Transform file into blob URL
            setSrc(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result);
                // setSrc(reader.result);
                // const blob = window.dataURLToBlob(reader.result);
            }
            reader.readAsDataURL(file);

            if (src != "") {
                setEncoded(true);
                handleUpload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async () => {
        if (encoded) {
            const lectureObj = {
                courseId: courseId,
                // video: base64data,
                video: src,
                lectureNum: lectureNum
            }
            const res = await UseCreate('lectures', lectureObj);
            console.log(res);
            if (res && res.status && res.status >= 200) {
                setUploaded(true);
                setLectureId(res.data.id);
            }
        }
    }

    const tryfunc = () => {
        setSrc(URL.createObjectURL(vid));

        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            // setSrc(reader.result);
            // const blob = window.dataURLToBlob(reader.result);
        }
        reader.readAsDataURL(vid);
    }
    useEffect(() => { if (vid) tryfunc() }, [vid])

    // bsd

    const BSD = () => {

        // const path = "C://Users/win/Videos/sequence 1 - white.mp4";
        const path = 'clouds_-_16923 (540p).mp4'
        //    const fs = new FileSystemHandle();


        // <video id="1" alt="pic" data-src={require(`${path}`)}></video> NO


    }

    // bsd
    const path = '/clouds_-_16923 (540p).mp4'

    return (<>
        <Menu />
        <div className="card">
            <div className="flex justify-content-center">

                <h2>Create Lecture #{lectureNum}</h2>
            </div>
            <Divider />

            {!uploaded && <FileUpload
                name="demo[]"
                // url={'/api/upload'}
                multiple accept="video/*"
                customUpload
                // uploadHandler={customBase64Uploader}
                uploadHandler={handle}
                maxFileSize={1000000000}
                emptyTemplate={<p className="m-0">Drag and drop video to here to upload.</p>} />}
            {uploaded &&
                <>
                    <div className="flex flex-column md:flex-row">
                        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                            <h2>Upload Video</h2>
                            <Message severity='success' text='Uploaded' />
                            <video src={src} controls width="80%" onPlay={() => { console.log(lectureNum, src) }}>
                                Sorry, your browser doesn't support embedded videos.
                            </video>
                        </div>
                        <Divider layout='vertical' />
                        <TaskTeacher lectureId={lectureId} lectureNum={lectureNum} courseId={courseId} setVisible={setVisible}/>
                        {/* <Divider layout='vertical' /> */}
                    </div>
                </>
            }
        </div>
    </>)
}


/*

                function dataURItoBlob(dataURI) {
                    // convert base64 to raw binary data held in a string
                    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
                    var byteString = atob(dataURI.split(',')[1]);
                  
                    // separate out the mime component
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
                  
                    // write the bytes of the string to an ArrayBuffer
                    var ab = new ArrayBuffer(byteString.length);
                  
                    // create a view into the buffer
                    var ia = new Uint8Array(ab);
                  
                    // set the bytes of the buffer to the correct values
                    for (var i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                  
                    // write the ArrayBuffer to a blob, and you're done
                    var blob = new Blob([ab], {type: mimeString});
                    return blob;
                  
                  }


*/