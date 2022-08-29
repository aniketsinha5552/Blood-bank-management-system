import React, {Component} from 'react'
import {Row, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
let auth = new Auth();

class HospitalEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoaded    : false,
            hospital    : {},
            hid         : this.props.nid,
            bbid        : auth.getBbid(),
            name        : '',
            phone       : '',
            location    : '',
            address     : '',
            pin         : ''

        }
    }

    loadData(){
        
                if(!this.isLoaded){
                    axios.get(api.url+'/hospital_details/'+this.state.bbid+'/'+this.props.hid, {
                        
                    }).then((response) =>{
                        let hospital = response.data;
                        this.setState({ isLoaded : true, hospital : hospital[0],
                            name   : hospital[0].name,
                            phone   : hospital[0].phone,
                            location   : hospital[0].location,
                            address   : hospital[0].address,
                            pin         : hospital[0].pin
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
                <Input s={12} m={6} type="text" label="Hospital Name" 
                    defaultValue={ this.state.hospital.name } 
                    onChange={ (event) => {
                        this.setState({ name : event.target.value });
                    }}
                validate/>
                <Input s={12} m={6} type="tel" label="Phone" 
                    defaultValue={ this.state.hospital.phone}
                    onChange={ (event) => {
                        this.setState({ phone : event.target.value });
                    }} validate/>
                <Input s={12} m={6} type="text" label="Location / City" 
                    defaultValue={ this.state.hospital.location}
                    onChange={ (event) => {
                        this.setState({ location : event.target.value });
                    }} validate/>
                <Input s={12} m={6} type="text" label="Address" 
                    defaultValue={ this.state.hospital.address}
                    onChange={ (event) => {
                        this.setState({ address : event.target.value });
                    }}validate/>
                <Input s={12} m={6} type="tel" label="Secret PIN" 
                    defaultValue={ this.state.hospital.pin}
                    onChange={ (event) => {
                        this.setState({ pin : event.target.value });
                    }}validate/>
                </div>
        )
     }
        

     /**
     * Method to Delete the current hospital form the bloodbank
     */
    deleteRecord(){
        
                if(this.props.hid){
        
                    axios.post(api.url+'/delete_hospital', {
                            'bbid'      : this.state.bbid,
                            'hid'    : this.state.hospital.hid
                    }).then((response) => {
                        if(response.status === 200){
                            alert('removed from humkin');
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
     * Method to update the hospital record for the entire db
     */
    updateRecord(){
        if(this.props.hid){
            
                        axios.post(api.url+'/update_hospital', {
                            'hid'       : this.props.hid,
                            'bbid'      : this.state.bbid,
                            'name'     : this.state.name,
                            'phone'     : this.state.phone,
                            'location'     : this.state.location,
                            'address'     : this.state.address,
                            'pin'          : this.state.pin
                        }).then((response) => {
                            if(response.status === 200){
                                alert('updated details');
                                this.props.closeCallBack();
                            }else{
                                alert('unable to update record');
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
                    <p className="card_title m0top">hospital Edit</p>
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

export default HospitalEdit;