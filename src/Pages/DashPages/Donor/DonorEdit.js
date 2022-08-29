import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
let auth = new Auth();

const bloodType = [
                    'A+', 'A-',
                    'B+', 'B-',
                    'AB+', 'AB-',
                    'O+', 'O-'
                ];

class DonorEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoaded    : false,
            donor       : {},
            adhaar      : this.props.adhaar,
            bbid        : auth.getBbid(),
            fname       : '',
            lname       : '',
            email       : '',
            phone       : '',
            gender      : 'M',
            blood       : 'A+',
            dob         : '',
            location    : ''

        }
    }

    componentWillMount(){
        // loadjs('..../public/js/materialize.min.js')
    }

    /**
     * Function to load donor data from api to state
     */
    loadData(){

        if(!this.isLoaded){
            axios.get(api.url+'/donor_details/'+this.state.bbid+'/'+this.props.adhaar, {
                
            }).then((response) =>{
                let donor = response.data;
                this.setState({ isLoaded : true, donor : donor[0],
                    fname   : donor[0].fname,
                    lname   : donor[0].lname,
                    email   : donor[0].email,
                    phone   : donor[0].phone,
                    location: donor[0].location,
                    dob     : donor[0].dob,
                    gender  : donor[0].gender,
                    blood   : donor[0].blood
                });
                console.log(response.data);
               
            }).catch((error)=>{
                console.log('aint got any');
            });
        }

    }

    /**
     * Function to return the input fields after setting the data for each
     */
    getRows(){
        return(
            <div>
                <Input s={12} m={6} type="tel" label="Aadhar Number" defaultValue={this.state.donor.adhaar} 
                        onChange={
                            (e) => {
                                this.setState({ adhaar : e.target.value });
                            }
                        } validate/> 
                <Input s={12} m={6} type="email" label="Email Address" defaultValue={this.state.donor.email}
                        onChange={
                            (e) => {
                                this.setState({ email : e.target.value });
                            }
                        }validate/>
                <Input s={12} m={6} type="text" label="First Name" defaultValue={this.state.donor.fname} 
                        onChange={
                            (e) => {
                                this.setState({ fname : e.target.value });
                            }
                        }validate/>
                <Input s={12} m={6} type="text" label="Last Name" defaultValue={this.state.donor.lname} 
                        onChange={
                            (e) => {
                                this.setState({ lname : e.target.value });
                            }
                        }validate/>
                <Input s={12} m={6} type="tel" label="Phone Number" defaultValue={this.state.donor.phone} 
                        onChange={
                            (e) => {
                                this.setState({ phone : e.target.value });
                            }
                        }validate/>
                <Input s={12} m={6} type="text" placeholder="" label="Birth Date" defaultValue={this.state.donor.dob} 
                        onChange={
                            (e) => {
                                this.setState({ dob : e.target.value });
                            }
                        }  />
                <Input s={12} m={6} type="text" label="City / Address" defaultValue={this.state.donor.location} 
                        onChange={
                            (e) => {
                                this.setState({ location : e.target.value });
                            }
                        } validate/>
                <Col s={6} m={3}>
                <select className="custom-select" defaultValue={ this.state.donor.gender} 
                onChange={ (event) => {
                    console.log('changed');
                    this.setState({ gender : event.target.value });
                }} >
                        <option disabled>Gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                        <option value='O'>Other</option>
                    </select>
                </Col>
                <Col s={6} m={3}>
                <select className="custom-select" defaultValue={ this.state.donor.blood }
                        onChange={
                            (e) => {
                                this.setState({ blood : e.target.value });
                            }
                        }>
                <option disabled>Blood Type</option>
                {
                            bloodType.map( (btype, index) => {
                                return <option value={btype} label={btype} />
                            })
                        }
        
                    </select>
                </Col>
        </div>
        );
   
    }

    /**
     * Method to Delete the current registration form the bloodbank
     */
    deleteRecord(){

        if(this.props.adhaar){

            axios.post(api.url+'/delete_donor', {
                    'bbid'      : this.state.bbid,
                    'adhaar'    : this.state.donor.adhaar
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
     * Method to update the donor record for the entire db
     */
    updateRecord(){
        if(this.props.adhaar){
            
                        axios.post(api.url+'/update_donor', {
                            'adhaar'    : this.props.adhaar,
                            'bbid'      : this.state.bbid,
                            'fname'     : this.state.fname,
                            'lname'     : this.state.lname,
                            'email'     : this.state.email,
                            'phone'     : this.state.phone,
                            'gender'    : this.state.gender,
                            'blood'     : this.state.blood,
                            'dob'       : this.state.dob,
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
                    <p className="card_title m0top">Donor Edit</p>
                    <hr className="_small_line" />  
                </Row>
                
                { this.state.isLoaded ? this.getRows() : this.loadData() }
                
               
                
        
        <div className="col s12 m0 pad10 center">
            <Button className="m10 waves-effect waves-light red accent-2" onClick={ (event) => { this.deleteRecord() } }>Delete</Button>
            <Button className="m10 waves-effect waves-light red accent-2"  onClick={ (event) => { this.updateRecord() } }>Update</Button>
        </div>
        </Row>

        )
    }
}

export default DonorEdit