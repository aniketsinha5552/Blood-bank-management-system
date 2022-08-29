import React, {Component} from 'react';
import {Table} from 'react-materialize';
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth';
let auth = new Auth();

class Storage extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            isAvailable : false,
            storageData : {},
            bbid    : auth.getBbid()
        }
    }
    getStorage(){
        axios.get(api.url+'/storage_details/'+this.state.bbid,{
            
                    }).then((response) => {
                        console.log(response);
                         this.setState((prevState, props) => {
                             return({ storageData : response.data, isAvailable : true });
                         });
                    }).catch((error) => {
                        console.log(error);
                    });
    }

    prepareData(){

        if(this.state.isAvailable){
            let data = this.state.storageData[0];
            return(
                <tr>
                    <td> { data.ap } L</td>
                    <td> { data.an } L</td>
                    <td> { data.bp } L</td>
                    <td> { data.bn } L</td>
                    <td> { data.abp } L</td>
                    <td> { data.abn } L</td>
                    <td> { data.op } L</td>
                    <td> { data.o_n } L</td>
                    <td> { data.total } L</td>
                </tr>
            )
        }
    }
    render(){
        return(
            <div className="basic_card pad20 card-2 m20top">
               <Table className="stripped">
                <thead>
                    <tr>
                        <th data-field="ap">A+</th>
                        <th data-field="an">A-</th>
                        <th data-field="bp">B+</th>
                        <th data-field="bn">B-</th>
                        <th data-field="abp">AB+</th>
                        <th data-field="abn">AB-</th>
                        <th data-field="op">O+</th>
                        <th data-field="o_n">O-</th>
                        <th data-field="total">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.isAvailable ? this.prepareData() : this.getStorage() }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Storage