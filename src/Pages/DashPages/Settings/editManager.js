import React, {Component} from 'react';
import {Row, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
import Notifications, {notify} from 'react-notify-toast';

let auth = new Auth();

class EditManager extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoaded    : false,
            manager     : {},
            bbid        : auth.getBbid(),
            fname       : '',
            lname       : '',
            email       : '',
            phone       : '',
            oldPass     : '',
            newPass     : '',
            rePass      : '',

        }
    }

    loadData(){
        
        if(!this.isLoaded){
            axios.get(api.url+'/manager_details/'+this.state.bbid, {
                
            }).then((response) =>{
                let mgr = response.data;
                this.setState({ isLoaded : true, manager : mgr[0],
                    fname   : mgr[0].fname,
                    lname   : mgr[0].lname,
                    email   : mgr[0].email,
                    phone   : mgr[0].phone
                });
                console.log(response.data);
               
            }).catch((error)=>{
                if(error)
                    console.log('aint got any');
            });
        }
        
     }

     updateManager(){
         console.log('bbid : '+this.state.bbid);
        if(this.state.bbid){
            axios.post(api.url+'/edit_manager', {
                'bbid'      : this.state.bbid,
                'fname'     : this.state.fname,
                'lname'     : this.state.lname,
                'email'     : this.state.email,
                'phone'     : this.state.phone
            }).then((response)=>{
                if(response.status === 200){
                    notify.show("Updated Successfully",'success',1000);
                }else{
                    notify.show("Something is wrong",'warning',1000)
                }
            }).catch((error)=>{
                notify.show("Please check the details provided",'warning',1000)
            });
        }
     }

     changePassword(){
        if(this.state.bbid){
            if(this.state.newPass === this.state.rePass){
                axios.post(api.url+'/change_password', {
                    'bbid'      : this.state.bbid,
                    'old_pass'     : this.state.oldPass,
                    'new_pass'     : this.state.newPass
                }).then((response)=>{
                    if(response.status === 200){
                        notify.show("Password changed successfully",'success',1000);
                    }else if (response.status === 202){
                        notify.show('Plese enter all the details','warning',1000);
                    }else if(response.status === 201){
                        notify.show('Specified password doesen\'t match old password','warning',1000);
                    }
                }).catch((error)=>{
                    notify.show("Please check the details provided",'warning',1000);
                });
            }else{
                notify.show('Passwords doesnt match','warning',1000);
            }
           
        }
     }


     getInputs(){
        
       return(
           <div>
               <Input s={12} m={6} type="text" label="First Name" 
                   defaultValue={ this.state.manager.fname}
                   onChange={ (event) => {
                       this.setState({ fname : event.target.value });
                   }} validate/>
               <Input s={12} m={6} type="text" label="Last Name" 
                   defaultValue={ this.state.manager.lname}
                   onChange={ (event) => {
                       this.setState({ lname : event.target.value });
                   }} validate/>

               <Input s={12} m={6} type="email" label="Email Address" 
                   defaultValue={ this.state.manager.email } 
                   onChange={ (event) => {
                       this.setState({ email : event.target.value });
                   }}
               validate/>
               
               <Input s={12} m={6} type="tel" label="Phone Number" 
                   defaultValue={ this.state.manager.phone}
                   onChange={ (event) => {
                       this.setState({ phone : event.target.value });
                   }}validate/>

            <div className="col s12 m0 pad10 center">
                <Button className="m10 waves-effect waves-light red accent-2" onClick={ () => { this.updateManager() }}>Update Details</Button>
            </div>

                <Input s={12} m={6} type="password" label="Old Password" 
                   onChange={ (event) => {
                       this.setState({ oldPass : event.target.value });
                   }}validate/>
                   <div className="col s12 m0 pad0 center"/>

                <Input s={12} m={6} type="password" label="New Password" 
                   onChange={ (event) => {
                       this.setState({ newPass : event.target.value });
                   }}validate/>
                <Input s={12} m={6} type="text" label="Re-Enter Password" 
                   onChange={ (event) => {
                       this.setState({ rePass : event.target.value });
                   }}validate/>
                   <div className="col s12 m0 pad10 center">
                <Button className="m10 waves-effect waves-light red accent-2" onClick={ () => { this.changePassword() }}>Change Password</Button>
                </div>
               </div>
               
       )
    }
                

    render(){
        return(
            <Row>
                <Notifications/>
                <Row>
                    <p className="card_title m0top">Manager Details</p>
                    <hr className="_small_line" />  
                </Row>
                { this.state.isLoaded ? this.getInputs() : this.loadData() }
            </Row>
        );
    }

}

export default EditManager;
