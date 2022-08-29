
import React, {Component} from 'react';
import {Table} from 'react-materialize';
import HospitalListItem from './HospitalListItem';
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth';
let auth = new Auth();

class HospitalList extends Component{

    constructor(props){
        super(props);
        this.state = {
            hospitals : '',
            isAvailable : false,
            bbid    : auth.getBbid()
        }
    }

    editCallBack = (hid) => {
        this.props.editCallBack(hid);
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

    prepareHospitalList(){
        let rows = [];
        if(this.state.isAvailable){
            console.log(this.state.hospitals);
            let hospitalData = this.state.hospitals;
            for( let i = 0; i< Object.keys(hospitalData).length; i++){
                rows.push(
                    <HospitalListItem
                        editCallBack={ this.editCallBack }
                        hid={hospitalData[i].hid} 
                        name={hospitalData[i].name}
                        phone={ hospitalData[i].phone }
                        location={ hospitalData[i].location }
                        address={ hospitalData[i].address } />
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
                        <th data-field="adhaar">HID</th>
                        <th data-field="name">Name</th>
                        <th data-field="phone">Phone</th>
                        <th data-field="location">Location</th>
                        <th data-field="address">Address</th>
                    </tr>
            </thead>
            <tbody>
                { this.state.isAvailable ? this.prepareHospitalList() : this.loadHospitalList() }
            </tbody>
            </Table>
            </div>
        );
    }
}

export default HospitalList;