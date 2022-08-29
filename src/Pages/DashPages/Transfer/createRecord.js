import React, {Component} from 'react'
import {Row, Col, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
let auth = new Auth();

const hstyle = {
    'display' : 'none'
}

const vstyle = {
    'display' : 'block'
}

const bloodType = [
    'A+', 'A-',
    'B+', 'B-',
    'AB+', 'AB-',
    'O+', 'O-'
];

class CreateTransfer extends Component{

    constructor(props){
        super(props);
        this.state = {
            newHospital    : false,
            bbid           : auth.getBbid(),
            quantity       : '',
            blood          : '',
            hid            : '',
            hospitals      : {},
            isAvailable    : false

        }
    }

    loadHospitalList(){
        
                axios.get(api.url+'/all_hospitals/'+this.state.bbid,{
        
                }).then((response) => {
                    console.log(response);
                     this.setState((prevState, props) => {
                         return({ hospitals : response.data, isAvailable : true });
                     });
                }).catch((error) => {
                    console.log(error);
                });
        }

    createTransfer(){

        if(auth.getBbid()){

            axios.post(api.url+'/create_transfer',{
                'bbid'      : this.state.bbid,
                'hid'     : this.state.hid,
                'quantity'     : this.state.quantity,
                'blood'     : this.state.blood
            }).then((response) => {
                if(response.status === 200){
                    alert('record added!');
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

    getInputs(){

        return(
            <div>
                <Col s={6} m={6}>
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
                </Col>

                <div style={ this.getStyles() }>
                <Input s={12} m={6} type="number" label="Blood Quantity (ML)" onChange={
                    (e) => {
                        this.setState({ quantity : e.target.value })
                    }
                }  validate/>
               <Col s={6} m={3}>
               <select className="custom-select" onChange={ (event) => {
                   this.setState({ blood : event.target.value });
               }}>
               <option disabled>Blood Type</option>
               {
                           bloodType.map( (btype, index) => {
                               return <option value={btype} label={btype} />
                           })
                       }
       
                   </select>
               </Col> 
                <div className="col s12 m0 pad10 center">
                    <Button className="m10 waves-effect waves-light red accent-2" onClick={()=>{ this.createTransfer() }} >Create Record</Button>
                </div>    
                </div>
            </div>

        )
    }

    

    render(){
        return(
            <Row>
                <Row>
                    <p className="card_title m0top">Transfer Record</p>
                    <hr className="_small_line" />  
                </Row>
                
                { this.state.isAvailable ? this.getInputs() : this.loadHospitalList() }
        </Row>

        )
    }
}

export default CreateTransfer;