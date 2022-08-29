import React, {Component} from 'react';
import {Table} from 'react-materialize';
import NurseListItem from './NurseListItem';
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth';
let auth = new Auth();

class NurseList extends Component{


    constructor(props){
        super(props);
        this.state = {
            nurses : '',
            isAvailable : false,
            bbid        : auth.getBbid()
        }
    }

    editCallBack = (nid) => {
        this.props.editCallBack(nid);
    }

    loadNurseList(){
        
                axios.get(api.url+'/all_nurses/'+this.state.bbid,{
        
                }).then((response) => {
                    console.log(response);
                     this.setState((prevState, props) => {
                         return({ nurses : response.data, isAvailable : true });
                     });
                }).catch((error) => {
                    console.log(error);
                });
    }

    prepareNurseList(){
        let rows = [];
        if(this.state.isAvailable){
            console.log(this.state.nurses);
            let nurseData = this.state.nurses;
            for( let i = 0; i< Object.keys(nurseData).length; i++){
                rows.push(
                    <NurseListItem
                        editCallBack={ this.editCallBack }
                        nid={nurseData[i].nid} 
                        name={nurseData[i].fname+' '+nurseData[i].lname}
                        gender={ nurseData[i].gender }
                        location={ nurseData[i].location }
                        phone={ nurseData[i].phone }
                        email={ nurseData[i].email }
                        date={ nurseData[i].date } />
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
                        <th data-field="NID">NID</th>
                        <th data-field="name">Name</th>
                        <th data-field="gender">Gender</th>
                        <th data-field="location">Location</th>
                        <th data-field="phone">Phone</th>
                        <th data-field="Email">Email</th>
                        <th data-field="date">Join Date</th>
                    </tr>
            </thead>
            <tbody>
            { this.state.isAvailable ? this.prepareNurseList() : this.loadNurseList() }
            </tbody>
            </Table>
            </div>
        );
    }
}

export default NurseList;