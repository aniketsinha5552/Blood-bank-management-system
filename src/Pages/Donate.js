import React, {Component} from 'react';
import DonationForm from '../components/DonationForm';

class Donate extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <p className="card_title m0b">Donor Registration</p>
                </div>
                <div className="row">
                    <div className="grad_top_card card-2">
                        <div className="basic_card pad20">
                            <DonationForm/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Donate;