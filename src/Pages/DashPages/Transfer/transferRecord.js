import React, {Component} from 'react';
import {Table} from 'react-materialize';
import TRecordItem from './tRecordItem';
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth';
let auth = new Auth();

class TransferRecord extends Component{


    constructor(props){
        super(props);
        this.state = {
            records : '',
            isAvailable : false,
            bbid        : auth.getBbid()
        }
    }

    editCallBack = (tid) => {
        this.props.editCallBack(tid);
    }

    loadRecords(){
        
                axios.get(api.url+'/all_records/'+this.state.bbid,{
        
                }).then((response) => {
                    console.log(response);
                     this.setState((prevState, props) => {
                         return({ records : response.data, isAvailable : true });
                     });
                }).catch((error) => {
                    console.log(error);
                });
    }

    prepareRecords(){
        let rows = [];
        if(this.state.isAvailable){
            console.log(this.state.records);
            let recData = this.state.records;
            rows = recData.map((record)=>
                    <TRecordItem
                        editCallBack={ this.editCallBack }
                        tid={record.tid} 
                        hid={record.hid}
                        name={ record.name }
                        date={ record.date }
                        quantity={ record.quantity+' mL' }
                        blood={ record.blood }
                        status={ record.status } /> );
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
                        <th data-field="TID">TID</th>
                        <th data-field="HID">HID</th>
                        <th data-field="Hospital">Hospital</th>
                        <th data-field="rdate">Req. Date</th>
                        <th data-field="quantity">Quantity</th>
                        <th data-field="blood">Blood</th>
                        <th data-field="status">Status</th>
                    </tr>
            </thead>
            <tbody>
            { this.state.isAvailable ? this.prepareRecords() : this.loadRecords() }
            </tbody>
            </Table>
            </div>
        );
    }
}

export default TransferRecord;