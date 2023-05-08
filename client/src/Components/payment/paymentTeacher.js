import React from 'react';
import Cards from 'react-credit-cards';
import { useParams } from "react-router-dom";

import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
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
    // num() {
            // const { numLectures } = useParams();
                //  return <h2>for payment ${numLectures}</h2>
        // }
    

   
    render() {
        return (
            <div id="PaymentForm">
                <div className="card flex flex-column align-items-center gap-3 ">
                    <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                    />
                    <form>
                        <div className="flex-auto">
                            <label htmlFor="card number" className="font-bold block mb-2">Card Number</label>
                            <InputMask id="card number" type="tel" name="number" mask="9999 9999 9999 9999" placeholder="---- ---- ---- ----"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}>
                            </InputMask>
                        </div>

                        <div className="flex-auto">
                            <label htmlFor="name" className="font-bold block mb-2">Name</label>
                            <InputText id="name" name="name" mask="99/99" placeholder=""
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}></InputText>
                        </div>

                        <div className="flex-auto">
                            <label htmlFor="expiry" className="font-bold block mb-2">Expiry</label>
                            <InputMask id="expiry" name="expiry" mask="99/99" placeholder="--/--"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}></InputMask>
                        </div>

                        <div className="flex-auto">
                            <label htmlFor="cvc" className="font-bold block mb-2">CVC</label>
                            <InputMask id="cvc" name="cvc" mask="999" placeholder="---"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}></InputMask>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
