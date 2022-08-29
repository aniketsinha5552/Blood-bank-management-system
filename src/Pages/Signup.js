import React, {Component} from 'react';
import SignupForm from '../components/SignupForm';

class Signup extends Component{

    render(){
        return(
            <div>
            <div className="navbar-fixed">
            <nav className="fucia">
                <div className="nav-wrapper fucia ">
                    <a href="/login" className="brand-logo left"><i className="material-icons m20left">arrow_back</i>&nbsp;<span className="flow-text">Sign Up</span></a>
                </div>
            </nav>
        </div>
        <div className="basic_card ">
        <SignupForm/>
        </div>
        </div>
        )
    }
}

export default Signup;