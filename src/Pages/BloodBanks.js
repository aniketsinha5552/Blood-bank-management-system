import React, {Component} from 'react';
import { Row, Input, Icon} from 'react-materialize'
import BBSearchItem from '../components/BBSearchItem'
import axios from 'axios';
import api from '../api.json';

class BloodBank extends Component{

    constructor(props){
        super(props);
        this.state = {
            banks : {},
            cities: {},
            name  : '',
            city  : '',
            blood : '',
            isAvailable : false,
            isCA : false
        }
    }

    loadBBList(){
        
                axios.post(api.url+'/bloodbanks',{
                    
                }).then((response) => {
                    console.log(response);
                   this.setState((prevState, props)=> {
                       return({ banks : response.data, isAvailable : true });
                   })
                }).catch((error) => {
                    console.log(error);
                });
     }

    prepareBBList(){
        let rows = [];
        if(this.state.isAvailable){
            let bankData = this.state.banks;
            rows = bankData.map((b) => 
                <BBSearchItem
                    bbid={ b.bbid }
                    name={ b.name}
                    city={ b.city } 
                    ap={ b.ap }
                    an={ b.an }
                    bp={ b.bp }
                    bn={ b.bn }
                    abp={ b.abp }
                    abn={ b.abn }
                    op={ b.op }
                    o_n={ b.o_n }/>
            ); 
            return rows;
        }else{
            return( <h2> No Data to Display </h2>);
        }
    }

    changeBlood(blood){
        this.setState({ blood : blood});
        if(this.state.name && blood !== "1"){
            if(this.state.name.length > 3){
                axios.post(api.url+'/bloodbanks',{
                    'blood' : blood,
                    'name'  : this.state.name
                }).then((response) => {
                    console.log(response);
                   this.setState((prevState, props)=> {
                       return({ banks : response.data, isAvailable : true });
                   })
                }).catch((error) => {
                    console.log(error);
                });
            }
        }else if( blood !== "1"){
            axios.post(api.url+'/bloodbanks',{
                'blood' : blood
            }).then((response) => {
                console.log(response);
               this.setState((prevState, props)=> {
                   return({ banks : response.data, isAvailable : true });
               })
            }).catch((error) => {
                console.log(error);
            });
        }else{
            axios.post(api.url+'/bloodbanks',{
            }).then((response) => {
                console.log(response);
               this.setState((prevState, props)=> {
                   return({ banks : response.data, isAvailable : true });
               })
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    changeName(name){
        this.setState({ name : name});
        if(name){
            if(name.length > 3 && this.state.blood !== "1"){
                axios.post(api.url+'/bloodbanks',{
                    'blood' : this.state.blood,
                    'name'  : name
                }).then((response) => {
                    console.log(response);
                   this.setState((prevState, props)=> {
                       return({ banks : response.data, isAvailable : true });
                   })
                }).catch((error) => {
                    console.log(error);
                });
            }else if( name.length > 3){
                axios.post(api.url+'/bloodbanks',{
                    'name'  : this.state.name
                }).then((response) => {
                    console.log(response);
                   this.setState((prevState, props)=> {
                       return({ banks : response.data, isAvailable : true });
                   })
                }).catch((error) => {
                    console.log(error);
                });
            }
        }else{
            axios.post(api.url+'/bloodbanks',{
            }).then((response) => {
                console.log(response);
               this.setState((prevState, props)=> {
                   return({ banks : response.data, isAvailable : true });
               })
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    render(){
        return(
            <div className="container m20bottom">
            <div className="row">
                <div className="grad_top_card card-2">
                    <div className="basic_card pad20">
                    <Row className="valign-wrapper">
                        <Input s={6} validate label='Search BloodBank' onChange={
                            (e) => {
                                this.changeName(e.target.value);
                            }
                        }><Icon>search</Icon></Input>
                        <Input s={6} type='select' label="Blood Availability" defaultValue='1'
                            onChange={
                                (e) => {
                                    this.changeBlood(e.target.value);
                                }
                            } >
                            <option value="1">All</option>
                            <option value='ap'>A+</option>
                            <option value='an'>A-</option>
                            <option value='bp'>B+</option>
                            <option value='bn'>B-</option>
                            <option value='abp'>AB+</option>
                            <option value='abn'>AB-</option>
                            <option value='op'>O+</option>
                            <option value='o_n'>O-</option>
                        </Input>
                    </Row>
                    </div>
                    
                </div>
                <div className="basic_card pad20 card-2 m20top">
                { this.state.isAvailable ? this.prepareBBList() : this.loadBBList() }
                </div>
                
            </div>
        </div>
        )
    }
}

export default BloodBank;