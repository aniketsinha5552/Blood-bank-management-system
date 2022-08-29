import React, {Component} from 'react';
import {Row, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
let auth = new Auth();

class EditBloodBank extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoaded    : false,
            bank     : {},
            bbid        : auth.getBbid(),
            name        : '',
            city       : '',
            address     : '',
            pincode     : '',
            email       : '',
            phone       : ''

        }
    }

    loadData(){
        
        if(!this.isLoaded){
            axios.get(api.url+'/blood_bank_details/'+this.state.bbid, {
                
            }).then((response) =>{
                let bank = response.data;
                this.setState({ isLoaded : true, bank : bank[0],
                    name        : bank[0].name,
                    email       : bank[0].email,
                    phone       : bank[0].phone,
                    city        : bank[0].city,
                    address     : bank[0].address,
                    pincode     : bank[0].pincode

                });
                console.log(response.data);
               
            }).catch((error)=>{
                if(error)
                    console.log('aint got any');
            });
        }
        
     }

     updatebank(){
         console.log('bbid : '+this.state.bbid);
        if(this.state.bbid){
            axios.post(api.url+'/edit_bloodbank', {
                'bbid'      : this.state.bbid,
                'name'     : this.state.name,
                'email'     : this.state.email,
                'phone'     : this.state.phone,
                'city'     : this.state.city,
                'address'   : this.state.address,
                'pincode'     : this.state.pincode
            }).then((response)=>{
                if(response.status === 200){
                    alert('Details Updated Successfully');
                }else{
                    alert(' Somethings wrong!');
                }
            }).catch((error)=>{
                alert('Please check the details provided');
            });
        }
     }
    
     getInputs(){
        
       return(
           <div>
               <Input s={12} m={6} type="text" label="BloodBank Name" 
                   defaultValue={ this.state.bank.name}
                   onChange={ (event) => {
                       this.setState({ name : event.target.value });
                   }} validate/>
               <Input s={12} m={6} type="email" label="Email" 
                   defaultValue={ this.state.bank.email}
                   onChange={ (event) => {
                       this.setState({ email : event.target.value });
                   }} validate/>

               <Input s={12} m={6} type="tel" label="Phone Number" 
                   defaultValue={ this.state.bank.phone } 
                   onChange={ (event) => {
                       this.setState({ phone : event.target.value });
                   }}
               validate/>
               
               <Input s={12} m={6} type="text" label="Location / City" 
                   defaultValue={ this.state.bank.city}
                   onChange={ (event) => {
                       this.setState({ city : event.target.value });
                   }}validate/>
                <Input s={12} m={6} type="text" label="Address" 
                   defaultValue={ this.state.bank.address}
                   onChange={ (event) => {
                       this.setState({ address : event.target.value });
                   }}validate/>
                <Input s={12} m={6} type="tel" label="Pincode" 
                   defaultValue={ this.state.bank.pincode}
                   onChange={ (event) => {
                       this.setState({ pincode : event.target.value });
                   }}validate/>
    
                <div className="col s12 m0 pad10 center">
                <Button className="m10 waves-effect waves-light red accent-2" onClick={ () => { this.updatebank() }}>Update Details</Button>
                </div>
               </div>
               
       )
    }
                

    render(){
        return(
            <Row>
                <Row>
                    <p className="card_title m0top">bank Details</p>
                    <hr className="_small_line" />  
                </Row>
                { this.state.isLoaded ? this.getInputs() : this.loadData() }
            </Row>
        );
    }

}

export default EditBloodBank;
