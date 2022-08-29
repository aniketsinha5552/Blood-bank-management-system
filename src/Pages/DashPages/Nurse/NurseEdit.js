import React, {Component} from 'react'
import {Row, Col, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
let auth = new Auth();

class NurseEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoaded    : false,
            nurse       : {},
            nid         : this.props.nid,
            bbid        : auth.getBbid(),
            fname       : '',
            lname       : '',
            email       : '',
            phone       : '',
            gender      : 'M',
            location    : ''

        }
    }

    loadData(){
        
                if(!this.isLoaded){
                    axios.get(api.url+'/nurse_details/'+this.state.bbid+'/'+this.props.nid, {
                        
                    }).then((response) =>{
                        let nurse = response.data;
                        this.setState({ isLoaded : true, nurse : nurse[0],
                            fname   : nurse[0].fname,
                            lname   : nurse[0].lname,
                            email   : nurse[0].email,
                            phone   : nurse[0].phone,
                            location: nurse[0].location,
                            gender  : nurse[0].gender,
                        });
                        console.log(response.data);
                       
                    }).catch((error)=>{
                        if(error)
                            console.log('aint got any');
                    });
                }
        
     }

     getInputs(){

        return(
            <div>
                <Input s={12} m={6} type="email" label="Email Address" 
                    defaultValue={ this.state.nurse.email } 
                    onChange={ (event) => {
                        this.setState({ email : event.target.value });
                    }}
                validate/>
                <Input s={12} m={6} type="text" label="First Name" 
                    defaultValue={ this.state.nurse.fname}
                    onChange={ (event) => {
                        this.setState({ fname : event.target.value });
                    }} validate/>
                <Input s={12} m={6} type="text" label="Last Name" 
                    defaultValue={ this.state.nurse.lname}
                    onChange={ (event) => {
                        this.setState({ lname : event.target.value });
                    }} validate/>
                <Input s={12} m={6} type="tel" label="Phone Number" 
                    defaultValue={ this.state.nurse.phone}
                    onChange={ (event) => {
                        this.setState({ phone : event.target.value });
                    }}validate/>
                <Input s={12} m={6} type="text" label="City / Address" 
                    defaultValue={ this.state.location}
                    onChange={ (event) => {
                        this.setState({ location : event.target.value });
                    }}validate/>
                <Col s={6} m={3}>
                <select className="custom-select" 
                    defaultValue={ this.state.nurse.gender}
                    onChange={ (event) => {
                        this.setState({ gender : event.target.value });
                    }}>
                        <option disabled>Gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                        <option value='O'>Other</option>
                    </select>
                </Col>
                </div>
        )
     }
        

     /**
     * Method to Delete the current nurse form the bloodbank
     */
    deleteRecord(){
        
                if(this.props.nid){
        
                    axios.post(api.url+'/delete_nurse', {
                            'bbid'      : this.state.bbid,
                            'nid'    : this.state.nurse.nid
                    }).then((response) => {
                        if(response.status === 200){
                            alert('removed from register');
                            this.props.closeCallBack();
                        }else{
                            alert('unable to delete record');
                            this.props.closeCallBack();
                        }
                        
                    }).catch((error) => {
                        console.log('errorr');
                    });
                }
        }

 /**
     * Method to update the nurse record for the entire db
     */
    updateRecord(){
        if(this.props.nid){
            
                        axios.post(api.url+'/update_nurse', {
                            'nid'       : this.props.nid,
                            'bbid'      : this.state.bbid,
                            'fname'     : this.state.fname,
                            'lname'     : this.state.lname,
                            'email'     : this.state.email,
                            'phone'     : this.state.phone,
                            'gender'    : this.state.gender,
                            'location'  : this.state.location
                        }).then((response) => {
                            if(response.status === 200){
                                alert('updated details');
                                this.props.closeCallBack();
                            }else{
                                alert('unable to delete record');
                                this.props.closeCallBack();
                            }
                            
                        }).catch((error) => {
                            console.log(error);
                        });
        }
    }
    render(){
        return(
            <Row>
                <Row>
                    <p className="card_title m0top">Nurse Edit</p>
                    <hr className="_small_line" />  
                </Row>
                
                { this.state.isLoaded ? this.getInputs() : this.loadData() }
                
        
        <div className="col s12 m0 pad10 center">
            <Button className="m10 waves-effect waves-light red accent-2" onClick={ () => { this.deleteRecord() }}>Delete</Button>
            <Button className="m10 waves-effect waves-light red accent-2" onClick={ () => { this.updateRecord() }}>Update</Button>
        </div>
        </Row>

        )
    }
}

export default NurseEdit