import React, {Component} from 'react'
import {Row, Col} from 'react-materialize'
import axios from 'axios';
import api from '../../api.json';
import Auth from '../../auth';
let auth = new Auth();

class DashView extends Component{

    constructor(props){
        super(props);
        this.state = {
            isAvailable : false,
            bbdata      : {},
        }
    }

    getBBData(){
        if(!this.state.isAvailable){
            axios.get(api.url+'/bbdetails/'+auth.getBbid(), null ).then(
                (results) => {
                    this.setState((prevState, props)=>{
                        return({ bbdata : results.data, isAvailable: true});
                    })
                }
            ).catch((error) => {
                    console.log(error);
            });
        }
    }

    getFields(){
        if(this.state.isAvailable){
            let data = this.state.bbdata[0];
            return(
                <div>
                    <Row className="center">
                        <p className="card_title ">{ data.bname }</p>
                    </Row>
                    <Row>
                    <Col s={6}>
                     <ul className="collection">
                         <li className="collection-item avatar">
                             <i className="material-icons circle">location_city</i>
                             <span className="title">City</span>
                             <p>{ data.bcity }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">location_on</i>
                             <span className="title">Address</span>
                             <p>{ data.baddress }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">local_phone</i>
                             <span className="title">Phone</span>
                             <p>{ data.bphone }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">markunread</i>
                             <span className="title">Email</span>
                             <p>{ data.bemail }</p>
                         </li>
                         
                         <li className="collection-item avatar">
                             <i className="material-icons circle">nature_people</i>
                             <span className="title">Registered Donors</span>
                             <p>{ data.dcount }</p>
                         </li>
                     </ul>
                     </Col>
                     <Col s={6}>
                     <ul className="collection">
                         <li className="collection-item avatar">
                             <i className="material-icons circle">person</i>
                             <span className="title">Manager</span>
                             <p>{ data.mfname+' '+data.mlname }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">contact_phone</i>
                             <span className="title">Manager Phone</span>
                             <p>{ data.mphone }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">contact_mail</i>
                             <span className="title">Manager Email</span>
                             <p>{ data.memail }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">local_pharmacy</i>
                             <span className="title">Registered Hospitals</span>
                             <p>{ data.hcount }</p>
                         </li>
                         <li className="collection-item avatar">
                             <i className="material-icons circle">invert_colors</i>
                             <span className="title">Blood Available</span>
                             <p>{ data.tblood + 'L'}</p>
                         </li>
                         
                     </ul>
                     </Col>
                     </Row>
                </div>
            )
        }
    }

    render(){
        return(
            <Row>
               <Col s={12} m={12} l={12}>
                   <div className="grad_top_card card-2">
                       <div className="basic_card pad20 p20bottom">
                           { this.state.isAvailable ? this.getFields() : this.getBBData() }
                       </div>
                   </div>
               </Col>
            </Row>
        )
    }
}

export default DashView