import React, { useState, useEffect, useContext } from 'react';
import ReactPlayer from 'react-player';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import { useNavigate, useParams } from 'react-router-dom';
import { UseGetAll, UseGetAllById, UseGetOneById, UseGetOneByIdAndBody } from "../../services/useGetAxios";
import { Task } from '../task/Task';
import { ProgressBar } from 'primereact/progressbar';
import UserContext from '../UserContext';
import Video from '../../Video';
import Menu from '../menu/menu';
import { UseUpdate } from '../../services/UsePutAxios';

const Lectures = (props) => {

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
    const [next, setNext] = useState(0);
    const [numOfLectures, setNumOfLectures] = useState(0);
    const [canTest, setCanTest] = useState(false);
    const [addLectures, setAddLectures] = useState(<></>);
    const [visibleTest, setVisibleTest] = useState(false);
    const [timeToTest, setTimeToTest] = useState(0);

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

    useEffect(() => {
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

    useEffect(() => {
        if (status == 'teachers' && course && numOfLectures < course.lecturesNum) {
            setAddLectures(<Button label='Add lectures' onClick={() => { navigate(`/upload-lectures/${courseId}`) }} />);
        }
        const fetchData = async () => {
            const resTestToCourse = await UseGetOneById('test_courses/course', course.id);
            setTimeToTest(resTestToCourse.data.hoursOfTest);
            console.log(resTestToCourse)
        }
        if (course)
            fetchData();
    }, [course])

    const confirm = () => {
        navigate(`/test/${courseStudent.id}`);
        localStorage.setItem('startHour', new Date().toLocaleTimeString());
        setVisibleTest(false);
    }

    const dialogFooter = <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
        <div className="flex gap-2">
            <Button onClick={() => confirm()} type="button" label="Confirm" className="p-button-success w-6rem" />
            <Button onClick={(e) => setVisibleTest(false)} type="button" label="Cancel" className="p-button-warning w-6rem" />
        </div>
    </div>

    const LectureTemplate = (lectureByCourse) => {
        const [hasTask, setHasTask] = useState(false);

        useEffect(() => {
            const fetchData = async () => {
                const resHasTask = await UseGetOneById('tasks/lecture', lectureByCourse.id);
                if (resHasTask.status && resHasTask.status === 204) setHasTask(false);
                else setHasTask(true);
            }
            fetchData();
        }, []);

        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="card flex flex-wrap justify-content-center align-items-end gap-2">
                    <Badge value={lectureByCourse.lectureNum} size="xlarge" severity="secondary" />
                    {lectureByCourse.lectureNum < next && <Badge value={<i className="pi pi-check-circle" style={{ fontSize: '2rem', color: 'white' }}></i>} size="xlarge" severity="success" />}
                </div>

                <video
                    value="https://www.w3schools.com/html/mov_bbb.mp4"//{lectureByCourse.video}
                    player='mp4'
                    controls={true}//{lectureByCourse.lectureNum <= next}
                    width="420"
                    height="250"
                    onPlay={() => console.log('MP4 Started Playing')}
                    onPause={() => console.log('MP4 Stopped Playing')}
                ></video>
                {hasTask &&
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button id={lectureByCourse.id} icon="pi pi-file" className="p-button p-button-rounded" label="task" severity="info"
                            onClick={(e) => {
                                setLectureId(lectureByCourse.id);
                                setVisible(true);
                            }} />
                        <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                            <Task lectureId={lectureId} courseStudentId={courseStudent.id} setVisible={setVisible} />
                        </Dialog>
                    </div>}
            </div>
        );
    };

    console.log(timeToTest);
    return (
        <>
            <Menu />
            <>{numOfLectures !== 0 &&
                <>
                    <div className="card">
                        <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold', color: 'gray' }}>
                            Lectures Of {course.name} Course
                            <br />
                            {canTest && <Button label='TEST' onClick={(e) => { setVisibleTest(true) }} />}
                        </div>
                        <div className="card">
                            {next > 1 && (next - 1) / numOfLectures * 100 < 100 && <ProgressBar value={(next - 1) / numOfLectures * 100}></ProgressBar>}

                        </div>
                        <Carousel value={lectures} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={LectureTemplate} />
                    </div>
                </>
            }
                {addLectures}
                {visibleTest &&
                    <Dialog visible={visibleTest} onHide={() => setVisibleTest(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="flex align-items-center flex-column pt-6 px-3">
                            <i className="pi pi-exclamation-triangle" style={{ fontSize: '5rem', color: 'var(--red-400)' }}></i>
                            <h3>Pay Attention!</h3>
                            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                After confirming you would move to the test and time is limited to {timeToTest}.
                                <br />Are you ready to start?
                            </p>
                        </div>
                    </Dialog>}
            </>
        </>
    )
}
export default Lectures;

// TEST STUDENT