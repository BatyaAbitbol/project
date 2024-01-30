import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image'
import { useNavigate, useParams } from 'react-router-dom';
import { UseGetAllById, UseGetOneById, UseGetOneByIdAndBody } from "../../services/useGetAxios";
import { Task } from '../task/Task';
import { TaskTeacher } from '../task/TaskTeacher';
import { ProgressBar } from 'primereact/progressbar';
import UserContext from '../UserContext';
import Menu from '../menu/menu';
import { UseUpdate } from '../../services/UsePutAxios';
import lecturesImage from '../../images/OnlineLectures.gif';
import { Messages } from 'primereact/messages';


const Lectures = (props) => {

    const base64 = require('js-base64');

    const { courseId } = useParams();
    // const user = useContext(UserContext);
    // const status = user.status;
    // const id = user.id;

    const user = JSON.parse(localStorage.getItem('userInfo'));
    const id = user.id;
    const status = user.status;

    const [lectures, setLectures] = useState(null);
    const [course, setCourse] = useState();
    const [courseStudent, setCourseStudent] = useState({});
    const [visible, setVisible] = useState(false);
    const [lectureId, setLectureId] = useState(null);
    const [lectureNum, setLectureNum] = useState(null);
    const [next, setNext] = useState(0);
    const [numOfLectures, setNumOfLectures] = useState(0);
    const [canTest, setCanTest] = useState(false);
    const [tested, setTested] = useState(false);
    const [addLectures, setAddLectures] = useState(<></>);
    const [visibleMsg, setvisibleMsg] = useState(false);


    const navigate = useNavigate();

    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const msgs = useRef(null);

    useEffect(() => {
        let lecturesNum = 0;
        const fetchData = async () => {
            const resCourseStudent = await UseGetOneByIdAndBody('course_students/student/course', id, { courseId: courseId })
            const resCourse = await UseGetOneById('courses', courseId);
            const resLectures = await UseGetAllById('lectures/course', courseId);
            setCourseStudent(resCourseStudent.data);
            setCourse(resCourse.data);
            setLectures(resLectures.data);
            setNumOfLectures(resLectures.data.length);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const resCanTest = await UseGetOneById('tests/canTest', courseStudent.id);

            /*
            const isTested = await UseGetOneById('tests/course_student', courseStudent.id);
            if (isTested && isTested.status && isTested.status == 200) {
                // setCanTest(false);
                setTested(true);
            }
            */
            setCanTest(resCanTest.data);
            setNext(courseStudent.nextLectureNum);

        }
        fetchData();
    }, [courseStudent]);
    useEffect(() => {
        const fetchData = async () => {
            const obj = courseStudent;
            obj.nextLectureNum = next;
            // const updateNext = await UseUpdate('course_students', obj);
        };
        if (next > 1)
            fetchData();
    }, [next]);

    let count = 0;
    useEffect(() => {
        if (status == 'teachers' && course && numOfLectures < course.numOfLectures) {
            setAddLectures(<>
                {numOfLectures == 0 && <>
                    <h2 style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold', color: 'gray' }}>Lectures Of {course.name} Course</h2>
                    <div className='card' style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold', color: 'gray' }}>
                        <br />
                        <Image src={lecturesImage} width='60%' />
                    </div>
                </>}
                <Button label='Add lectures' onClick={() => { navigate(`/upload-lectures/${courseId}`) }} />
            </>);
            if (!visibleMsg)
                msgs.current.show([
                    { sticky: true, severity: 'info', detail: `You should upload lectures to this course.`, closeable: false },
                    { sticky: true, severity: 'warn', detail: `This course is limited to ${course.lecturesNum} lectures. There are already ${numOfLectures} lectures in this course.` }
                ])
            setvisibleMsg(true);
        }
    }, [course])

    const LectureTemplate = (lectureByCourse) => {
        const [hasTask, setHasTask] = useState(false);

        // useEffect(() => {
        //     const fetchData = async () => {
        //         const resHasTask = await UseGetOneById('tasks/lecture', lectureByCourse.id);
        //         console.log(resHasTask);
        //         if (resHasTask.response && resHasTask.response.status && resHasTask.response.status === 404) setHasTask(false);
        //         else setHasTask(true);
        //     }
        //     try {
        //         fetchData();
        //     }
        //     catch (err) { }
        // }, []);

        // const res = base64.decode(lectureByCourse.video);


        // //----
        //         const src = URL.createObjectURL(lectureByCourse.video);

        //         const reader = new FileReader();
        //         reader.onloadend = () => {
        //             console.log(reader.result);
        //             // setSrc(reader.result);
        //             // const blob = window.dataURLToBlob(reader.result);
        //         }
        //         reader.readAsDataURL(lectureByCourse.video);
        // //---

        const handlePlay = async (lectureNum) => {
            if (status == 'teachers')
                return;
            else if (courseStudent.nextLectureNum == lectureNum) {
                console.log('handlePLay');
                const obj = {
                    id: courseStudent.id,
                    studentId: courseStudent.studentId,
                    courseId: courseId,
                    registerDate: courseStudent.registerDate,
                    nextLectureNum: courseStudent.nextLectureNum + 1
                };

                setNext(courseStudent.nextLectureNum + 1);
                setCourseStudent(obj);
                try {
                    const res = await UseUpdate('course_students', obj);
                    console.log(res);
                    
                } catch (error) {

                }
                
            }
        }
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="card flex flex-wrap justify-content-center align-items-end gap-2">
                    <Badge value={lectureByCourse.lectureNum} size="xlarge" severity="secondary" />
                    {lectureByCourse.lectureNum < next && <Badge value={<i className="pi pi-check-circle" style={{ fontSize: '2rem', color: 'white' }}></i>} size="xlarge" severity="success" />}
                </div>

                {/* <video src={lecture 
                    ByCourse.video} controls width="80%" onPlay={() => { }} /> */}
                <ReactPlayer
                    className='player'
                    url={lectureByCourse.video}
                    width="80%"
                    playing={false}
                    muted={false}
                    controls
                    onPlay={() => {
                        console.log(`play ${lectureByCourse.lectureNum}`);
                        handlePlay(lectureByCourse.lectureNum);
                    }}
                    id={lectureByCourse.lectureNum}
                />

                {//hasTask &&
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button id={lectureByCourse.id} icon="pi pi-file" className="p-button p-button-rounded" label="task" severity="info"
                            onClick={(e) => {
                                setLectureId(lectureByCourse.id);
                                setLectureNum(lectureByCourse.lectureNum);
                                setVisible(true);
                            }} />
                        <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} maximizable >
                            {status == 'students' && <Task lectureId={lectureId} courseStudentId={courseStudent.id} setVisible={setVisible} />}
                            {status == 'teachers' && <TaskTeacher lectureId={lectureId} lectureNum={lectureNum} courseId={courseId} setVisible={setVisible} />}
                        </Dialog>
                    </div>}
            </div>
        );
    };

    return (
        <>
            <Menu />
            <div className="card">
                <>
                    {numOfLectures !== 0 &&
                        <>
                            <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold', color: 'gray' }}>
                                Lectures Of {course.name} Course
                                <br />
                                {status == 'teachers' && <Button label="Create Lecture" severity="info" text onClick={() => navigate(`/lectures/create/${course.id}`)} />}
                                {canTest && <Button label='TEST' onClick={(e) => { navigate(`/test/${courseStudent.id}`) }} />}
                            </div>
                            <div className="card">
                                {next > 1 && (next - 1) / numOfLectures * 100 < 100 && <ProgressBar value={Math.round((next - 1) / numOfLectures * 100)}></ProgressBar>}

                            </div>
                            <Carousel value={lectures} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={LectureTemplate} />
                        </>
                    }
                    {status == 'teachers' &&
                        <div className='card'>
                            {addLectures}
                            {course && <Messages ref={msgs} />}
                        </div>}
                </>
            </div>
        </>
    )
}
export default Lectures;