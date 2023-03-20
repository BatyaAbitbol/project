import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import './index.css';

import Start from './Components/Start';
import SignIn from './Components/signIn/SignIn';
import Home from './Components/home/Home';
import SignUpTeachers from './Components/sign-up/SignUpTeachers';
import SignUpStudents from './Components/sign-up/SignUpStudents';

import { SignUp } from './Components/sign-up/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Start />}></Route>
          <Route exact path='/home-page' element={<Home/>}/>
          <Route exact path='/sign-in' element={<SignIn/>}/>
          <Route exact path='/sign-up' element={<SignUp/>}/>
          <Route exact path='/sign-up/teacher' element={<SignUpTeachers/>}/>
          <Route exact path='/sign-up/student' element={<SignUpStudents/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;