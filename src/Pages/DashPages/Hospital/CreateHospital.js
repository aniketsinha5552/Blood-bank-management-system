import React, {Component} from 'react'
import {Row, Input, Button} from 'react-materialize'
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth'
let auth = new Auth();

const hstyle = {
    'display' : 'none'
}

const vstyle = {
    'display' : 'block'
}

class CreateHospital extends Component{

    constructor(props){
        super(props);
        this.state = {
            newHospital    : false,
            bbid        : auth.getBbid(),
            name       : '',
            phone       : '',
            address       : '',
            location       : '',
            pin         : ''
        }
    }
    componentWillMount(){
        // loadjs('..../public/js/materialize.min.js')
    }

    validateFields(){
        //TODO: create validation logic
    }

    closeRegistration = ()=>{
        this.props.closeCallBack();
    }

    createHospital(){

        if(this.state.newHospital){

                axios.post(api.url+'/create_hospital',{
                        'bbid'      : this.state.bbid,
                        'name'     : this.state.name,
                        'phone'     : this.state.phone,
                        'location'     : this.state.location,
                        'address'     : this.state.address,
                        'pin'           : this.state.pin
                }).then((response) => {
                    console.log(response);
                    this.closeRegistration();
                }).catch((error) => {
                    console.log(error);
                });
         }
    }

    checkName(name){
        if(name){
            if(name.length > 3){
                this.setState({ newHospital : true, name: name });
            }else{
                this.setState({ newHospital : false, name: name });
                return;
            }
            
        }
        axios.post(api.url+'/check_hospital_name', {
            'name' : name
        }).then((respose) => {
            if(respose.status === 200){
                this.setState({ newHospital : false, name: name });
            }else{
                this.setState({ newHospital : true, name: name });
            }
            
        }).catch((error) => {
            console.log(error)
        });
    }

    getStyles(){
        if(this.state.newHospital){
            return vstyle;
        }else{
            return hstyle;
        }
    }

    
    render(){
        return(
            <Row>
                <Row>
                    <p className="card_title m0top">Hospital Registration</p>
                    <hr className="_small_line" />  
                </Row>
                <Input s={12} m={6} type="text" label="Hospital Name"
                    onChange={
                        (e) =>{
                            this.checkName(e.target.value);
                        }
                    } validate/>
                <div style={ this.getStyles() }>
                <Input s={12} m={6} type="tel" label="Phone"
                        onChange={
                            (event) =>{
                                this.setState({ phone : event.target.value });
                            }
                        } validate/>
                    <Input s={12} m={6} type="text" label="Location / City"
                        onChange={
                            (event) =>{
                                this.setState({ location : event.target.value });
                            }
                        } validate/>
                    <Input s={12} m={6} type="text" label="Address"
                        onChange={
                            (event) =>{
                                this.setState({ address : event.target.value }); 
                            }
                        } validate/>
                    <Input s={12} m={6} type="tel" label="Secret PIN"
                        onChange={
                            (event) =>{
                                this.setState({ pin : event.target.value }); 
                            }
                        } validate/>
            
                    <div className="col s12 m0 pad10 center">
                        <Button className="m10 waves-effect waves-light red accent-2" onClick={ (event) => { this.createHospital() }}>Register</Button>
                    </div>
                    </div>

                
                
        </Row>

        )
    }
}

export default CreateHospital;