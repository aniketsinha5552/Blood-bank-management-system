import React, {Component} from 'react'
import {Row, Col, Input, Button} from 'react-materialize'
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth';
import Notifications, {notify} from 'react-notify-toast';

let auth = new Auth();

const hstyle = {
    'display' : 'none'
}

const vstyle = {
    'display' : 'block'
}

class DonationForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            adhaar      : '',
            newDonor    : false,
            isNurse     : false,
            blood       : '',
            name        : '',
            bbid        : auth.getBbid(),
            quantity    : '',
            nid         : '',
            isNurseLoaded : false,
            nurses       : {}
        }
    }

    loadNurseList(){
        
                axios.get(api.url+'/all_nurses/'+this.state.bbid,{
        
                }).then((response) => {
                    console.log(response);
                     this.setState((prevState, props) => {
                         return({ nurses : response.data, isNurseLoaded : true });
                     });
                }).catch((error) => {
                    console.log(error);
                });
    }

    checkAdhaar(adhaarId){
        
        axios.post(api.url+'/check_registered_donor', {
            'adhaar' : adhaarId,
            'bbid'  :   this.state.bbid
        }).then((respose) => {
            if(respose.status === 200){
                console.log(respose.data);
                this.setState({ newDonor : true, 
                                adhaar   : adhaarId, 
                                blood    : respose.data[0].blood,
                                name     : respose.data[0].fname+' '+respose.data[0].lname });
            }else{
                notify.show('Adhaar not registered','warning',500);                
                this.setState({ newDonor : false, adhaar: adhaarId })
            }
            
        }).catch((error) => {
            console.log(error)
        });
    }

    checkNurseId(nurse_id){
        axios.post(api.url+'/check_nurse_id', {
            'nurse_id' : nurse_id,
            'bbid'  :   this.state.bbid
        }).then((respose) => {
            if(respose.status === 200){
                console.log(respose.data);
                this.setState({ isNurse : true, nid: nurse_id })
            }else{
                this.setState({ isNurse : false, nid: nurse_id })
            }
            
        }).catch((error) => {
            console.log(error)
        });
    }


    getStyles(){
        if(this.state.newDonor){
            return vstyle;
        }else{
            return hstyle;
        }
    }

    getNurseStyle(){
        if(this.state.isNurse){
            return vstyle;
        }else{
            return hstyle;
        }
    }

    getInputs(){
        return(
            <div>
                    <Input s={12} m={6} type="tel" label="Aadhar Number" onChange={
                        (e) => {
                            this.checkAdhaar(e.target.value)
                        }
                    } validate/>

                    <div style={ this.getStyles() }>
                        <Input s={12} m={3} type="text" value={ this.state.name} disabled/>
                        <Input s={12} m={3} type="text" value={ this.state.blood} disabled/>
                        <Input s={12} m={6} type="number" label="Quantity in ml" 
                        onChange={
                            (e) => {
                                this.setState({ quantity : e.target.value });
                            }
                        } validate/>
                         <Col s={6} m={6}>
                            <select className="custom-select" onChange={ (event) => {
                                this.checkNurseId(event.target.value);
                            }}>
                            <option value="0">Choose Nurse</option>
                            {
                                        this.state.nurses.map( (nurse, index) => {
                                            return <option value={nurse.nid} label={nurse.fname +' '+nurse.lname} />
                                        })
                                    }
                    
                                </select>
                            </Col>

                <Col s={9}/>
                <div className="col s3 m0 pad10 right" style={ this.getNurseStyle() } >
                    <Button className="m10 waves-effect waves-light red accent-2" onClick={ ()=> { this.createDonation() }}>Add to bank</Button>
                </div>
            </div>
            </div>
        )
    }
    createDonation(){
        axios.post(api.url+'/create_donation', {
            'nid'  : this.state.nid,
            'bbid'      : this.state.bbid,
            'adhaar'    : this.state.adhaar,
            'quantity'  : this.state.quantity
        }).then((respose) => {
            if(respose.status === 200){
                console.log(respose.data);
                this.props.notify('Donation record added');
                this.props.onCloseEdit();
            }else{
                alert('Something went wrong')
            }
            
        }).catch((error) => {
            console.log(error)
        });
    }
    render(){
        return(
            <Row>
               <Notifications/>
            <div className="basic_card m10top row pad20 card-1">
                <Row>
                    <p className="card_title m0top">Donation Entry</p>
                    <hr className="_small_line" />  
                </Row>
                
                { this.state.isNurseLoaded ? this.getInputs() : this.loadNurseList() }
        </div>        
        </Row>

        )
    }
}

export default DonationForm