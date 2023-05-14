// import React from 'react';
// import Cards from 'react-credit-cards';
// import { useParams } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button'

// import { InputMask } from "primereact/inputmask";
// import { InputText } from "primereact/inputtext";
// export default class PaymentForm extends React.Component {
//     state = {
//         cvc: '',
//         expiry: '',
//         focus: '',
//         name: '',
//         number: '',
//         numLectures:''
//     };
//     handleInputFocus = (e) => {
//         this.setState({ focus: e.target.name });
//     }
//     handleInputChange = (e) => {
//         const { name, value } = e.target;
//         this.setState({ [name]: value });
//     }

//       }
//     // num=() =>{
//     //       this.setState({[numLectures]:useParams});
//     //              return <h2>for payment ${numLectures}</h2>
//     //     }
//     render() {
//         return (
//             <div id="PaymentForm">
//                 {/* {num()} */}
//                 {/* <h2>for payment ${this.state.numLectures}</h2> */}
//                 <div className="card flex flex-column align-items-center gap-3 ">
//                     <Cards
//                         cvc={this.state.cvc}
//                         expiry={this.state.expiry}
//                         focused={this.state.focus}
//                         name={this.state.name}
//                         number={this.state.number}
//                     />
//                     <form>
//                         <div className="flex-auto">
//                             <label htmlFor="card number" className="font-bold block mb-2">Card Number</label>
//                             <InputMask id="card number" type="tel" name="number" mask="9999 9999 9999 9999" placeholder="---- ---- ---- ----"
//                                 onChange={this.handleInputChange}
//                                 onFocus={this.handleInputFocus}>
//                             </InputMask>
//                         </div>

//                         <div className="flex-auto">
//                             <label htmlFor="name" className="font-bold block mb-2">Name</label>
//                             <InputText id="name" name="name" mask="99/99" placeholder=""
//                                 onChange={this.handleInputChange}
//                                 onFocus={this.handleInputFocus}></InputText>
//                         </div>

//                         <div className="flex-auto">
//                             <label htmlFor="expiry" className="font-bold block mb-2">Expiry</label>
//                             <InputMask id="expiry" name="expiry" mask="99/99" placeholder="--/--"
//                                 onChange={this.handleInputChange}
//                                 onFocus={this.handleInputFocus}></InputMask>
//                         </div>

//                         <div className="flex-auto">
//                             <label htmlFor="cvc" className="font-bold block mb-2">CVC</label>
//                             <InputMask id="cvc" name="cvc" mask="999" placeholder="---"
//                                 onChange={this.handleInputChange}
//                                 onFocus={this.handleInputFocus}></InputMask>
//                         </div>
//                         <Button label="pay" severity="info" raised  onClick={() => this.navigate(`/courses/${this.state}/my-courses`)} />
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button'

const PaymentForm = () => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }
    const navigate = useNavigate();
    const { numOfLecture } = useParams();
    const status = JSON.parse(localStorage.getItem('userInfo')).status
    return (
            // <h2>{numOfLecture}</h2>
            <div className="card flex flex-column align-items-center gap-3 ">
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <form>
                <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <input
                    type="tel"
                    name="expiry"
                    placeholder="expiry"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <input
                    type="tel"
                    name="CVC"
                    placeholder="CVC"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                   <Button label="pay" severity="info" raised  onClick={() => navigate(`/courses/${status}/my-courses`)} />
            </form>

        </div>
    );
}

export default PaymentForm;