import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { UseCreate } from "../../services/usePostAxios";

export function Payment(props) {
    
    const {courseId} = useParams();
    const navigate = useNavigate();

    const registerToCourse = () => {
        const obj = {
            studentId: JSON.parse(localStorage.getItem('userInfo')).id,
            courseId: courseId,
            registerDate: new Date(),
            nextLectureNum: 1
        }
        const register = async () => {
            const res = await UseCreate('course_students', obj);
            if (res.status == 201){
                console.log('נרשמת בהצלחה');
                navigate('/student/courses')
            }
            else {
                console.log(res.response.data.message);
                navigate('/courses')
            }
        }
        register();
    }
    return (
        <>
            <div className="card">
                <Button label="OK" onClick={(e) => {
                    registerToCourse();
                }}/>
            </div>
        </>
    )
}
// ---------------------------------------------------
/*
Install:
npm install --save react-credit-cards
Usage:
import React from 'react';
import Cards from 'react-credit-cards';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  
  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form>
            <input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          ...
        </form>
      </div>
    );
  }
}
*/