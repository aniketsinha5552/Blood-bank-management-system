import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import axios from 'axios';
import api from '../api.json';
import {browserHistory} from 'react-router';

const bloodType = [
    'A+', 'A-',
    'B+', 'B-',
    'AB+', 'AB-',
    'O+', 'O-'
];


const hstyle = {
    'display' : 'none'
}

const vstyle = {
    'display' : 'block'
}

class BBView extends Component{


    constructor(props){
        super(props);
        this.state = {
            isAvailable : false,
            bbdata      : {},
            hid         : '',
            secret_pin  : '',
            quantity    : '',
            blood       : '',
            hospitals      : {},
            newHospital    : false,
            isHospitalAvailable : false

        }
    }
    
    loadHospitalList(){
        
                axios.get(api.url+'/all_hospitals/'+this.state.bbid,{
        
                }).then((response) => {
                    console.log(response);
                     this.setState((prevState, props) => {
                         return({ hospitals : response.data, isHospitalAvailable : true });
                     });
                }).catch((error) => {
                    console.log(error);
                });
        }

        checkHID(hid){
            
            if(hid){
                axios.get(api.url+'/check_hid/'+hid, null ).then((response) => {
                    if(response.status === 200){
                        this.setState({ newHospital : true, hid : hid })
                    }else{
                        this.setState({ newHospital : false, hid : hid });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }else{
                this.setState({ newHospital : true, hid : hid });
            }
           
        }
    
        getStyles(){
            if(this.state.newHospital){
                return vstyle;
            }else{
                return hstyle;
            }
        }
    
    createRequest(){
        if(this.state.hid && this.state.secret_pin && this.state.quantity && this.state.blood !== "caption"){
            axios.post(api.url+'/transfer_request',{
                'bbid'  : this.getBloodBankId(),
                'hid'   : this.state.hid,
                'pin'   : this.state.secret_pin,
                'quantity': this.state.quantity,
                'blood' : this.state.blood
            }).then((results)=>{
                console.log(results);
                if(results.status === 200){
                    alert('Request Sent !');
                    this.setState({ isHospitalAvailable : false})   
                }else{
                    alert('Error : invalid name and pin');
                }
            }).catch((error)=>{
                console.log(error);
                alert("Unable to generate your request");
            });
        }else{
            console.log("somethingzz wrong mate !");
            console.log('bbid : '+this.getBloodBankId());
            console.log('hid : '+this.state.hid);
            console.log('pin : '+this.state.secret_pin);
            console.log('qty : '+this.state.quantity);
            console.log('blood : '+this.state.blood);
        }
    }

    getBloodBankId(){
        if( !this.props.params.bbid){
            browserHistory.push('/');
            return
        }else{
            return this.props.params.bbid;
        }       
    }


    getBBData(){
        if(!this.state.isAvailable){
            axios.get(api.url+'/bbdetails/'+this.getBloodBankId(), null ).then(
                (results) => {
                    this.setState((prevState, props)=>{
                        return({ bbdata : results.data, isAvailable: true});
                    })
                }
            ).catch((error) => {
                    console.log(error);
            });
        }
    }

    getFields(){
        if(this.state.isAvailable){
            let data = this.state.bbdata[0];
            return(
                <div>
                    <Row className="center">
                        <p className="card_title ">{ data.bname }</p>
                    </Row>
                    <Row>
                    <Col s={6}>
                     <ul className="collection">
                         <li className="collection-item avatar">
                             <i className="material-icons circle">location_city</i>
                             <span className="title">City</span>
                             <p>{ data.bcity }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">location_on</i>
                             <span className="title">Address</span>
                             <p>{ data.baddress }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">local_phone</i>
                             <span className="title">Phone</span>
                             <p>{ data.bphone }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">markunread</i>
                             <span className="title">Email</span>
                             <p>{ data.bemail }</p>
                         </li>
                         
                         <li className="collection-item avatar">
                             <i className="material-icons circle">nature_people</i>
                             <span className="title">Registered Donors</span>
                             <p>{ data.dcount }</p>
                         </li>
                     </ul>
                     </Col>
                     <Col s={6}>
                     <ul className="collection">
                         <li className="collection-item avatar">
                             <i className="material-icons circle">person</i>
                             <span className="title">Manager</span>
                             <p>{ data.mfname+' '+data.mlname }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">contact_phone</i>
                             <span className="title">Manager Phone</span>
                             <p>{ data.mphone }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">contact_mail</i>
                             <span className="title">Manager Email</span>
                             <p>{ data.memail }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">local_pharmacy</i>
                             <span className="title">Registered Hospitals</span>
                             <p>{ data.hcount }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">invert_colors</i>
                             <span className="title">Blood Available</span>
                             <p>{ data.tblood + 'L'}</p>
                         </li>
                         
                     </ul>
                     </Col>
                     </Row>
                </div>
            )
        }
    }


    getHospitalInputs(){
        return(
            <div>
                <select className="custom-select" onChange={ (event) => {
                    this.checkHID(event.target.value);
                }}>
                <option value="0">Choose Hospital</option>
                {
                            this.state.hospitals.map( (hospital, index) => {
                                return <option value={hospital.hid} label={hospital.name} />
                            })
                        }
        
                </select>
                <div style={this.getStyles()}>
             <Input s={12} type="tel" label="Secret PIN" 
                                    onChange={
                                        (event) =>{
                                            this.setState({ secret_pin : event.target.value});
                                        }
                                    } validate/>
                                <Input s={12} type="number" label="Quantity (ML)" 
                                    onChange={
                                        (event) =>{
                                            this.setState({ quantity : event.target.value });
                                        }
                                    } validate/>

                                <select className="custom-select" onChange={ (event) => {
                                        this.setState({ blood : event.target.value });
                                    }}>
                                    <option value="caption">Blood Type</option>
                                    {
                                                bloodType.map( (btype, index) => {
                                                    return <option value={btype} label={btype} />
                                                })
                                            }
                    
                                </select>
                                <div className="col s12 m20top pad10 center">
                                    <Button className="m10 waves-effect waves-light red accent-2" onClick={ (event) => { this.createRequest() }}>Send Request</Button>
                                </div> 
                                </div>  
            </div>
        )
    }
    render(){
        return(
            <div>
                <div className="navbar-fixed">
                    <nav>
                    <div className="nav-wrapper fucia">
                    <a href="/" className="m20left main_logo">Blood Bank </a>
                    </div>
                </nav>
                </div>

                <Row className="m0 p0">
                    <Col s={12} m={6} l={6}>
                        <div className="grad_top_card card-2">
                            <div className="basic_card pad20 p20bottom">
                                { this.state.isAvailable ? this.getFields() : this.getBBData() }
                            </div>
                        </div>
                    </Col>
                    <Col s={12} m={6} l={6}>
                        <div className="basic_card pad20 p20bottom m0">
                                <Row>
                                    <p className="card_title">Blood Transfer Request</p>
                                </Row>
                                <p className="grey-text" >Hospital must be registered with this bloodbank to send request</p>
                                <Row>
                                
                                { this.state.isHospitalAvailable ? this.getHospitalInputs() : this.loadHospitalList() }
                                </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BBView;