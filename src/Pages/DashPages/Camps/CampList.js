import React, {Component} from 'react';
import {Table} from 'react-materialize';
import CampListItem from './CampListItem';
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth';
let auth = new Auth();

class CampList extends Component{

    
    constructor(props){
        super(props);
        this.state = {
            camps : '',
            isAvailable : false,
            bbid        : auth.getBbid()
        }
    }

    editCallBack = (cid) => {
        this.props.editCallBack(cid);
    }

    loadCampsList(){
        
                axios.post(api.url+'/all_camps/'+this.state.bbid,{
        
                }).then((response) => {
                    console.log(response);
                     this.setState((prevState, props) => {
                         return({ camps : response.data, isAvailable : true });
                     });
                }).catch((error) => {
                    console.log(error);
                });
    }

    prepareCampsList(){
        let rows = [];
        if(this.state.isAvailable){
            console.log(this.state.camps);
            let campsData = this.state.camps;
            for( let i = 0; i< Object.keys(campsData).length; i++){
                rows.push(
                    <CampListItem
                        editCallBack={ this.editCallBack }
                        camp_id={campsData[i].camp_id} 
                        name={campsData[i].name}
                        date={ campsData[i].cdate }
                        location={ campsData[i].location }
                        phone={ campsData[i].phone }
                        created={ campsData[i].created }/>
                )
            }

            return rows;
        }else{
            return( <h2> No Data to Display </h2>);
        }
    }
    render(){
        return(
            <div>
            <Table className="highlight">
                <thead>
                    <tr>
                        <th data-field="CampId">CampId</th>
                        <th data-field="name">Name</th>
                        <th data-field="Date">Date</th>
                        <th data-field="location">Location</th>
                        <th data-field="phone">Phone</th>
                        <th data-field="created">Created on</th>
                    </tr>
            </thead>
            <tbody>
            { this.state.isAvailable ? this.prepareCampsList() : this.loadCampsList() }
            </tbody>
            </Table>
            </div>
        );
    }
}

export default CampList