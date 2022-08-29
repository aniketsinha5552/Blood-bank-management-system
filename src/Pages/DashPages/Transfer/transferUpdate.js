import React, {Component} from 'react'
import {Row, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
let auth = new Auth();

const hstyle = {
    'display' : 'none'
}

const vstyle = {
}

class TransferUpdate extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoaded    : false,
            record       : {},
            tid         : this.props.tid,
            bbid        : auth.getBbid(),

        }
    }

    loadData(){
        
        if(!this.isLoaded){
            axios.get(api.url+'/transfer_details/'+this.state.bbid+'/'+this.props.tid, {

            }).then((response) =>{
                let rec = response.data;
                this.setState({ isLoaded : true, record : rec[0]});
                console.log(response.data);
            
            }).catch((error)=>{
                if(error)
                    console.log(error);
            });
        }
        
     }

     getStyles(){

        if(parseInt(this.state.record.available, 10) > parseInt(this.state.record.quantity, 10)){
            return vstyle;
        }else{
            return hstyle;
        }
    }

    getActionStyles(){
        if(this.state.record.status === 'SENT'){
            return hstyle;
        }else{
            return vstyle;
        }
    }

     getInputs(){

        return(
            <div>
                <Input s={12} m={6} type="text" label="Transfer ID" 
                    defaultValue={ this.state.record.tid } disabled/>
                <Input s={12} m={6} type="text" label="Hospital ID" 
                    defaultValue={ this.state.record.hid} disabled/>
                <Input s={12} m={6} type="text" label="Hospital Name" 
                    defaultValue={ this.state.record.hname} disabled/>
                <Input s={12} m={6} type="text" label="Hospital Location" 
                    defaultValue={ this.state.record.hlocation} disabled/>
                <Input s={12} m={6} type="text" label="Hospital Phone" 
                    defaultValue={ this.state.record.hphone} disabled/>
                <Input s={12} m={6} type="text" label="Blood Quantity" 
                    defaultValue={ this.state.record.quantity } disabled/>
                <Input s={12} m={6} type="text" label="Blood Type" 
                    defaultValue={ this.state.record.blood} disabled/>
                <Input s={12} m={6} type="text" label="Available" 
                    defaultValue={ this.state.record.available > 0 ? this.state.record.available : 'Currently Unavailable'} disabled/>
                <Row>
                    <div className="col s12 m0 pad10 center" style={ this.getActionStyles() }>
                        <Button className="m10 waves-effect waves-light red accent-2" onClick={ () => { this.deleteRecord() }}>Delete</Button>
                        <Button className="m10 waves-effect waves-light red accent-2" style={ this.getStyles() } onClick={ () => { this.updateRecord() }}>Transfer</Button>
                    </div>
                </Row>
                </div>
        )
     }
        

     /**
     * Method to Delete the current record form the bloodbank
     */
    deleteRecord(){
        
        if(this.props.tid){

            axios.post(api.url+'/delete_transfer', {
                    'bbid'      : this.state.bbid,
                    'tid'       : this.state.record.tid
            }).then((response) => {
                if(response.status === 200){
                    alert('removed from record');
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
     * Method to update the transfer record for the bb
     */
    updateRecord(){
        if(this.props.tid){
            
            axios.post(api.url+'/update_transfer', {
                'tid'       : this.props.tid,
                'bbid'      : this.state.bbid,
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
                    <p className="card_title m0top">Transfer Update</p>
                    <hr className="_small_line" />  
                </Row>
                
                { this.state.isLoaded ? this.getInputs() : this.loadData() }
        </Row>

        )
    }
}

export default TransferUpdate;