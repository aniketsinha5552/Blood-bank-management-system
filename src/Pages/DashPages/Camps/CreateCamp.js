import React, {Component} from 'react'
import {Row, Col, Input, Button} from 'react-materialize'
import api from '../../../api.json';
import axios from 'axios';
import Auth from '../../../auth';
let auth = new Auth();


class CreateCamp extends Component{

    constructor(props){
        super(props);
        this.state = {
            cname   : '',
            cnum    : '',
            cdate   : '',
            cloc    : '',
            bbid    : auth.getBbid()
        }
    }

    createCamp(){
        
        if(this.state.bbid){
        
            axios.post(api.url+'/create_camp',{
                 'bbid'      : this.state.bbid,
                'name'     : this.state.cname,
                'date'     : this.state.cdate,
                'phone'     : this.state.cnum,
                'location'     : this.state.cloc,
                    }).then((response) => {
                        if(response.status === 200){
                            alert('camp created!');
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

    getError(){
        if(this.state.cnum){
            if(this.state.cnum.length !== 10){
                return "Invalid Phone"; 
            }
        }
    }

    render(){
        return(
            <Row>
        
                    <Row>
                        <p className="card_title">Create Campaign</p>
                        <hr className="_small_line" />  
                    </Row>
                    <Input s={12} m={6} type="text" label="Camp Name" onChange={
                        (e) => {
                            this.setState({ cname : e.target.value })
                        }
                    } validate/>
                    <Input s={12} m={6} type="tel" label="Contact Number" onChange={
                        (e) => {
                            this.setState({ cnum : e.target.value })
                        }
                    } error={ this.getError() } validate/>
                    <Input s={12} m={6} type="text" placeholder="" label="Date (dd/mm/yyyy)" onChange={
                        (e) => {
                            this.setState({ cdate : e.target.value })
                        }
                    }   />
                    <Input s={12} m={6} type="text" label="Location/ City" onChange={
                        (e) => {
                            this.setState({ cloc : e.target.value })
                        }
                    } validate/>
                    < br/>
                    <Col s={12}>
                    <Col s={6}/>
                    <div className="col s12 center">
                        <Button className="m10 waves-effect waves-light red accent-2"  onClick={
                            (e) => {
                                this.createCamp()
                            }
                        }>Create Campaign</Button>
                    </div>
                    </Col>
             </Row>
        )
    }
}

export default CreateCamp;
