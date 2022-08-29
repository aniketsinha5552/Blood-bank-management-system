import React, {Component} from 'react';
import {Row, Col, Button} from 'react-materialize';
import axios from 'axios';
import api from '../api.json'
import {browserHistory} from 'react-router';
import validator from 'validator';
import Notifications, {notify} from 'react-notify-toast';


class SignupForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            mgr_fname : '',
            mgr_lname : '',
            mgr_phone : '',
            mgr_email : '',
            mgr_pass : '',
            mgr_repass : '',
            bb_name : '',
            bb_email : '',
            bb_phone : '',
            bb_city : '',
            bb_address : '',
            bb_pincode : ''
        }
        this.createAccount = this.createAccount.bind(this)
    }

    createAccount(){

        console.log(this.state.bb_address)
        
        if(this.validate()){
            axios.post(api.url+'/signup', {
                bb_name : this.state.bb_name,
                bb_email : this.state.bb_email,
                bb_phone : this.state.bb_phone,
                bb_city : this.state.bb_city,
                bb_address : this.state.bb_address,
                bb_pincode : this.state.bb_pincode,
                mgr_fname : this.state.mgr_fname,
                mgr_lname : this.state.mgr_lname,
                mgr_email : this.state.mgr_email,
                mgr_phone : this.state.mgr_phone,
                mgr_pass : this.state.mgr_pass
                
              })
              .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    browserHistory.push('/login');
                }else if(response.status === 201){
                    notify.show("Manager Email already exists", "warning", 1000);
                }else if( response.status === 202){
                    notify.show("BloodBank name already exists", "warning", 1000);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

    validate(){
        if(
            !this.isEmpty(this.state.mgr_fname)
            && !this.isEmpty(this.state.mgr_email)
            && !this.isEmpty(this.state.mgr_lname)
            && !this.isEmpty(this.state.mgr_pass)
            && !this.isEmpty(this.state.mgr_repass)
            && !this.isEmpty(this.state.mgr_phone)
            && !this.isEmpty(this.state.bb_name)
            && !this.isEmpty(this.state.bb_email)
            && !this.isEmpty(this.state.bb_phone)
            && !this.isEmpty(this.state.bb_pincode)
            && !this.isEmpty(this.state.bb_address)
            && !this.isEmpty(this.state.bb_city)
            
        ){
            if(!validator.isEmail(this.state.mgr_email)){
                notify.show("Invalid Manager Email", "warning", 1000);
                return false;
            }else if(!validator.isAlpha(this.state.mgr_fname) && !validator.isAlpha(this.state.mgr_lname)){
                notify.show("Invalid Manager Name", "warning", 1000);
                return false;
            }else if(!validator.equals(this.state.mgr_pass, this.state.mgr_repass)){
                notify.show("Passwords doesn't match", "warning", 1000);
                return false;
            }else if(!validator.isNumeric(this.state.mgr_phone) && !this.state.mgr_phone.length === 10){
                notify.show("Invalid Phone Number", "warning", 1000);
                return false;
            }else if(!this.test_name(this.state.bb_name)){
                notify.show("Invalid BloodBank Name", "warning", 1000);
                return false;
            }else if(!validator.isEmail(this.state.bb_email)){
                notify.show("Invalid BloodBank Email", "warning", 1000);
                return false;
            }else if(!validator.isNumeric(this.state.bb_phone) && !this.state.bb_phone.length === 10){
                notify.show("Invalid Phone Number", "warning", 1000);
                return false;
            }else if(!validator.isNumeric(this.state.bb_pincode) && !this.state.bb_pincode.length <= 6){
                notify.show("Invalid Pincode", "warning", 1000);
                return false;
            }else if(!validator.isAlpha(this.state.bb_city)){
                notify.show("Invalid City", "warning", 1000);
                return false;
            }else{
                return true;
            }
        }else {
            notify.show("Please fill all the details", "warning", 1000);
            return false;
        }
    }

    isEmpty(x) {
        return (x.length === 0 || !x.trim())
    }

    test_name(name){
        return /^[a-zA-Z ]+$/.test(name);
    }
    render(){
        return(
            <Row>
                <Notifications/>
            <div className="row">
                <Col s={12} m={6}>
                <p className="card_title">Manager Details</p>
                <hr className="_small_line" />
                <div className="input-field col s12 m6 l6">
                    <input id="fname" type="text" className="validate" 
                        onChange={ (e) => {
                            this.setState({ mgr_fname : e.target.value })
                        }
                            
                        } />
                    <label for="fname">First name</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="lname" type="text" className="validate"
                    onChange={ (event) => {
                            this.setState({ mgr_lname : event.target.value})}
                        }/>
                    <label for="lname">Last name</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="phone" type="tel" className="validate"
                    onChange={ (event) => {
                            this.setState({ mgr_phone : event.target.value})}
                        } />
                    <label for="phone">Phone Number</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="email" type="email" className="validate"
                    onChange={ (event) => {
                            this.setState({ mgr_email : event.target.value})}
                        } />
                    <label for="email">Email id</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="password" type="password" className="validate"
                    onChange={ (event) => {
                            this.setState({ mgr_pass : event.target.value})}
                        }/>
                    <label for="password">Password</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="repassword" type="password" className="validate"
                    onChange={ (event) => {
                            this.setState({ mgr_repass : event.target.value})}
                        } />
                    <label for="repassword">Confirm Password</label>
                </div>
                </Col>
                <Col s={12} m={6} >
                 <p className="card_title">Blood Bank Details</p>
                <hr className="_small_line" />
                <div className="input-field col s12 m6 l6">
                    <input id="bname" type="text" className="validate"
                    onChange={ (event) => {
                            this.setState({ bb_name : event.target.value})}
                        } />
                    <label for="bname">Blood Bank Name</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="bemail" type="email" className="validate"
                    onChange={ (event) => {
                            this.setState({ bb_email : event.target.value})}
                        } />
                    <label for="bemail">email</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="bphone" type="tel" className="validate"
                    onChange={ (event) => {
                            this.setState({ bb_phone : event.target.value})}
                        } />
                    <label for="bphone">Phone Number</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="city" type="text" className="validate"
                    onChange={ (event) => {
                            this.setState({ bb_city : event.target.value})}
                        } />
                    <label for="city">Location / City</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="address1" type="text" className="validate"
                    onChange={ (event) => {
                            this.setState({ bb_address : event.target.value})}
                        } />
                    <label for="address1">Address</label>
                </div>
                <div className="input-field col s12 m6 l6">
                    <input id="pincode" type="tel" className="validate"
                    onChange={ (event) => {
                            this.setState({ bb_pincode : event.target.value})}
                        }/>
                    <label for="pincode">PinCode</label>
                </div>
            </Col>
            </div>
            <div className="row m0 pad10 center">
                <Button className="m10 waves-effect waves-light red accent-2" 
                onClick={ (event) => { this.createAccount(event)} } >Register</Button>
            </div>
        </Row>
        )
    }
}
export default SignupForm;