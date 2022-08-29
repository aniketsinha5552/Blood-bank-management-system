import React, {Component} from 'react'
import {Table, Col, Pagination, Row} from 'react-materialize'
import DRecordItem from './DRecordItem'
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth';
let auth = new Auth();


class DonationRecord extends Component{

    constructor(props){
        super(props);
        this.state = {
            donations : '',
            isAvailable : false,
            bbid        : auth.getBbid(),
            isPaginationInit : false,
            countPages  : 0,
            countPerPage: 8,
            totalElements: 0,
            currentPage  : 1,
            startItem     : 0,
            endItem        : 0
        }
    }

    editCallBack = (nid) => {
        this.props.editCallBack(nid);
    }

    onChildClicked = (recordId) => {
        console.log('Clicked from record List');
        this.props.onClickEdit(recordId);
    }
    
    loadDonationList(){
                axios.post(api.url+'/donation_record/'+this.state.bbid,{
                        'from': this.state.startItem,
                        'to' : this.state.currentPage * this.state.countPerPage
                }).then((response) => {
                    console.log(response);
                     this.setState((prevState, props) => {
                         return({ donations : response.data, isAvailable : true });
                     });
                }).catch((error) => {
                    console.log(error);
                });
    }

    initpagination(){

        axios.get(api.url+'/record_details/'+this.state.bbid,{

        }).then((results)=>{
            let count = parseInt(results.data[0].count, 10);
            let startItem = 0;
            let countPages = Math.ceil(count/this.state.countPerPage);
            let endItem = parseInt(this.state.currentPage*this.state.countPerPage);
            this.setState({ totalElements : count,
                            startItem : startItem,
                            countPages: countPages,
                            endItem : endItem,
                            isPaginationInit: true});

        })
    }
    

    prepareDonationList(){
        let rows = [];
        if(this.state.isAvailable){
            console.log(this.state.donations);
            let ddata = this.state.donations;
            for( let i = 0; i< Object.keys(ddata).length; i++){
                rows.push(
                    <DRecordItem 
                    onClickEdit={this.onChildClicked} 
                    did={ddata[i].did}
                    name={ddata[i].fname+' '+ddata[i].lname} 
                    date={ddata[i].don_date} 
                    btype={ddata[i].blood} 
                    qty={ddata[i].quantity}
                    nurse={ddata[i].nurse_name}/>
                )
            }

            return rows;
        }else{
            return( <h2> No Data to Display </h2>);
        }
    }


    render(){
        return(
            <div className="basic_card pad20 card-2 m20top">
            <Row>
                <Table className="stripped">
                    <thead>
                        <tr>
                            <th data-field="fridge">DID</th>
                            <th data-field="name">Name</th>
                            <th data-field="date">Date</th>
                            <th data-field="bloodtype">Blood</th>
                            <th data-field="quantity">Qty</th>
                            <th data-field="nurse">Nurse</th>
                        </tr>
                </thead>
                <tbody>

                { this.state.isPaginationInit ? this.state.isAvailable ? this.prepareDonationList() : this.loadDonationList(): this.initpagination() }
                </tbody>
                </Table>
                <div className="divider m10top"/>
                <Col s={12} className="center p10">
                <Pagination items={this.state.countPages} activePage={this.state.currentPage} maxButtons={10} 
                            onSelect={ (page)=>{
                                let lastItem = parseInt(page)*this.state.countPerPage;
                                let startItem = lastItem - this.state.countPerPage;
                                this.setState({
                                    lastItem : lastItem,
                                    startItem : startItem,
                                    currentPage : page,
                                    isAvailable : false
                                })
                            }}/>
                </Col>
                </Row>
            </div>
        )
    }
}

export default DonationRecord;