import React, {Component} from 'react'
import {Row, Col, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import validator from 'email-validator';
import Auth from '../../../auth';
import Notifications, {notify} from 'react-notify-toast';


let auth = new Auth();

const hstyle = {
    'display' : 'none'
}

const vstyle = {
    'display' : 'block'
}

class NurseRegistration extends Component{

    constructor(props){
        super(props);
        this.state = {
            newNurse    : false,
            bbid        : auth.getBbid(),
            email       : '',
            fname       : '',
            lname       : '',
            phone       : '',
            location    : '',
            gender      : 'M'
        }
    }

    createNurse(){

        if(auth.getBbid()){

            axios.post(api.url+'/create_nurse',{
                'bbid'      : this.state.bbid,
                'email'     : this.state.email,
                'fname'     : this.state.fname,
                'lname'     : this.state.lname,
                'phone'     : this.state.phone,
                'location'  : this.state.location,
                'gender'    : this.state.gender
            }).then((response) => {
                if(response.status === 200){
                    alert('Nurse added!');
                    this.closeRegistration();
                }
            }).catch((error) => {
                console.log(error);
            })
        }else{
            console.log('no bbid');
        }
    }

    closeRegistration(){
        this.props.closeCallBack();
    }

    checkEmail(emailId){
        
        if(validator.validate(emailId)){
            axios.post(api.url+'/check_nurse_email',{
                'bbid'  : this.state.bbid,
                'email' : emailId
            }).then((response) => {
                if(response.status === 200){
                    this.setState({ newNurse : false, email : emailId })
                    notify.show('Email already Exists','warning',1000);
                }else{
                    this.setState({ newNurse : true, email : emailId });
                }
            }).catch((error) => {
                console.log(error);
            });
        }else{
            this.setState({ newNurse : false, email : emailId });
        }
       
    }

    getStyles(){
        if(this.state.newNurse){
            return vstyle;
        }else{
            return hstyle;
        }
    }

    

    render(){
        return(
            <Row>
                <Notifications/>
                <Row>
                    <p className="card_title m0top">Nurse Registration</p>
                    <hr className="_small_line" />  
                </Row>
                <Input s={12} m={6} type="email" label="Email Address" onChange={
                    (e) => {
                        this.checkEmail(e.target.value);
                    }
                } validate/>
                <div style={ this.getStyles() }>
                <Input s={12} m={6} type="text" label="First Name" onChange={
                    (e) => {
                        this.setState({ fname : e.target.value })
                    }
                }  validate/>
                <Input s={12} m={6} type="text" label="Last Name" onChange={
                    (e) => {
                        this.setState({ lname : e.target.value })
                    }
                }  validate/>
                <Input s={12} m={6} type="tel" label="Phone Number" onChange={
                    (e) => {
                        this.setState({ phone : e.target.value })
                    }
                }  validate/>
                <Input s={12} m={6} type="text" label="City / Address" onChange={
                    (e) => {
                        this.setState({ location : e.target.value })
                    }
                }  validate/>
                <Col s={6} m={3}>
                <select className="custom-select"  onChange={
                    (e) => {
                        this.setState({ gender : e.target.value })
                    }
                } >
                        <option disabled>Gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                        <option value='O'>Other</option>
                    </select>
                </Col>     
                <div className="col s12 m0 pad10 center">
                    <Button className="m10 waves-effect waves-light red accent-2" onClick={()=>{ this.createNurse() }} >Register</Button>
                </div>    
                </div>
        
        </Row>

        )
    }
}

export default NurseRegistration