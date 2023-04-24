import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import './index.css';

import Start from './Components/Start';
import SignUpTeachers from './Components/sign-up/SignUpTeachers';
import SignUpStudents from './Components/sign-up/SignUpStudents';

import HomeStudent from './Components/Home/home-student';
import HomeTeacher from './Components/Home/home-teacher';
import Courses from './Components/course/Courses';
import { SignUp } from './Components/sign-up/SignUp';
import { SignIn } from './Components/sign-in/SignIn';
import Lectures from './Components/lecture/Lecture';
import { CoursesForStudent } from './Components/course_student/CoursesForStudent';
import { Task } from './Components/task/Task';
import AddCourse  from './Components/course/addCourse';
import UploadLectures   from './Components/lecture/uploadLectures';
import { Payment } from './Components/payment/Payment';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Start />}></Route>
          <Route exact path='/sign-in' element={<SignIn />} />
          <Route exact path='/sign-up' element={<SignUp />} />


          <Route exact path='home/home-student' element={<HomeStudent />} />
          <Route exact path='home/home-teacher' element={<HomeTeacher />} />

          <Route exact path='/addCourse' element={<AddCourse/>} />
          <Route exact path='/sign-up/teacher' element={<SignUpTeachers />} />
          <Route exact path='/sign-up/student' element={<SignUpStudents />} />
          <Route exact path='/courses' element={<Courses />} />
          <Route exact path='/lectures' element={<Lectures />} />
          <Route exact path='/uploadLectures' element={<UploadLectures />} />

          <Route exact path='/payment/:courseId' element={<Payment />} />

          <Route exact path='/student/courses' element={<CoursesForStudent />} />
          <Route exact path='/student/courses/Math' element={<h1>Math</h1>} />
    


          <Route exact path='/course/payment' element={<h1>Buy a course & Pay</h1>} />
          <Route exact path='/task' element={<Task />} />

          <Route exact path='/*' element={<h1>Not Found, Sorry 😒</h1>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;