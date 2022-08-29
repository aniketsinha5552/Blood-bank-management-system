import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
let auth = new Auth();


class CampEdit extends Component{

    constructor(props){
        super(props);
        this.state = {
            cname   : '',
            cnum    : '',
            cdate   : '',
            cloc    : '',
            bbid    : auth.getBbid(),
            isLoaded    :   false,
            camp    :   {}
        }
    }


    loadData(){
        console.log('camp id : '+ this.props.camp_id+' bbid : '+ this.state.bbid);
                if(!this.isLoaded){
                    axios.get(api.url+'/camp_details/'+this.state.bbid+'/'+this.props.camp_id, {
                        
                    }).then((response) =>{
                        console.log(response);
                        let campsData = response.data;
                        this.setState({ isLoaded : true, camp : campsData[0],
                            cname   : campsData[0].name,
                            cnum   : campsData[0].phone,
                            cloc   : campsData[0].location,
                            cdate   : campsData[0].cdate,
                        });
                        console.log(response.data);
                       
                    }).catch((error)=>{
                            console.log(error);
                    });
                }
        
     }

    
     /**
     * Method to Delete the current nurse form the bloodbank
     */
    deleteRecord(){

                if(this.props.camp_id){
        
                    axios.post(api.url+'/delete_camp', {
                            'bbid'      : this.state.bbid,
                            'camp_id'    : this.props.camp_id
                    }).then((response) => {
                        if(response.status === 200){
                            alert('removed from camps');
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
     * Method to update the nurse record for the entire db
     */
    updateRecord(){
        if(this.props.camp_id){
            
                        axios.post(api.url+'/update_camp', {
                            'camp_id'       : this.props.camp_id,
                            'bbid'      : this.state.bbid,
                            'name'     : this.state.cname,
                            'phone'     : this.state.cnum,
                            'location'     : this.state.cloc,
                            'date'     : this.state.cdate
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

    getError(){
        if(this.state.cnum){
            if(this.state.cnum.length !== 10){
                return "Invalid Phone"; 
            }
        }
    }

    getInputs(){

        console.log("inside get INput");

            return(

                <div>
                <Input s={12} m={6} type="text" label="Camp Name"
                defaultValue={ this.state.camp.name }
                 onChange={
                    (e) => {
                        this.setState({ cname : e.target.value })
                    }
                } validate/>
                <Input s={12} m={6} type="tel" label="Contact Number" 
                defaultValue={ this.state.camp.phone } 
                onChange={
                    (e) => {
                        this.setState({ cnum : e.target.value })
                    }
                } error={ this.getError() } validate/>
                <Input s={12} m={6} type="text" placeholder="" label="Date (dd/mm/yyyy)" 
                defaultValue={ this.state.camp.cdate}
                onChange={
                    (e) => {
                        this.setState({ cdate : e.target.value })
                    }
                }   />
                <Input s={12} m={6} type="text" label="Location/ City" 
                defaultValue={ this.state.camp.location}
                onChange={
                    (e) => {
                        this.setState({ cloc : e.target.value })
                    }
                } validate/>
    
                </div>
            )
            
    }


    render(){
        return(
            <Row>
            
                        <Row>
                            <p className="card_title">Create Campaign</p>
                            <hr className="_small_line" />  
                        </Row>
                        
                        < br/>

                        { this.state.isLoaded ? this.getInputs() : this.loadData() }

                        <Col s={12}>
                        <div className="col s12 center">
                        <Button className="m10 waves-effect waves-light red accent-2"  onClick={
                                (e) => {
                                    this.deleteRecord()
                                }
                            }>DELETE</Button>
                            <Button className="m10 waves-effect waves-light red accent-2"  onClick={
                                (e) => {
                                    this.updateRecord()
                                }
                            }>UPDATE</Button>
                        </div>
                        </Col>
                 </Row>
        )
    }
}

export default CampEdit