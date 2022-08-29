import React, {Component} from 'react';
import {Table, Col, Pagination, Row} from 'react-materialize';
import DonorListItem from './DonorListItem';
import axios from 'axios';
import api from '../../../api.json';
import Auth from '../../../auth';
let auth = new Auth();

class DonorList extends Component{

    constructor(props){
        super(props);
        this.state = {
            donors : '',
            isAvailable : false,
            bbid    : auth.getBbid(),
            isPaginationInit : false,
            countPages  : 0,
            countPerPage: 8,
            totalElements: 0,
            currentPage  : 1,
            startItem     : 0,
            endItem        : 0
        }
    }

    editCallBack = (adhaar) => {
        this.props.editCallBack(adhaar);
    }

    loadDonorList(){

        axios.post(api.url+'/all_donors/'+this.state.bbid,{
            'from' : this.state.startItem,
            'to'   : this.state.currentPage*this.state.countPerPage
        }).then((response) => {
            console.log(response);
             this.setState((prevState, props) => {
                 return({ donors : response.data, isAvailable : true });
             });
        }).catch((error) => {
            console.log(error);
        });
    }

    prepareDonorList(){
        let rows = [];
        if(this.state.isAvailable){
            console.log(this.state.donors);
            let donorData = this.state.donors;
            for( let i = 0; i< Object.keys(donorData).length; i++){
                rows.push(
                    <DonorListItem
                        editCallBack={ this.editCallBack }
                        adhaar={donorData[i].adhaar} 
                        name={donorData[i].fname+' '+donorData[i].lname}
                        age={ donorData[i].dob }
                        blood={ donorData[i].blood }
                        gender={ donorData[i].gender }
                        location={ donorData[i].location }
                        phone={ donorData[i].phone }
                        email={ donorData[i].email } />
                )
            }

            return rows;
        }else{
            return( <h2> No Data to Display </h2>);
        }
    }

    initpagination(){
        
                axios.get(api.url+'/donor_count/'+this.state.bbid,{

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

    render(){
        return(
            <div>
                <Row>
            <Table className="highlight">
                <thead>
                    <tr>
                        <th data-field="adhaar">Adhaar</th>
                        <th data-field="name">Name</th>
                        <th data-field="age">Age</th>
                        <th data-field="blood">Blood</th>
                        <th data-field="gender">Gender</th>
                        <th data-field="location">Location</th>
                        <th data-field="phone">Phone</th>
                        <th data-field="Email">Email</th>
                    </tr>
            </thead>
            <tbody>
                { this.state.isPaginationInit ? this.state.isAvailable ? this.prepareDonorList() : this.loadDonorList() : this.initpagination()  }
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
        );
    }
}

export default DonorList;