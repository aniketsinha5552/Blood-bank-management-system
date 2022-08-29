import React, {Component} from 'react';
import {Row} from 'react-materialize';
import CampCard from '../components/CampCard'
import axios from 'axios';
import api from '../api.json';

class Camps extends Component{


    constructor(props){
        super(props);
        this.state = {
            camps : '',
            isAvailable : false,
        }
    }

    loadCampList(){
        
                axios.get(api.url+'/camp_list',{
        
                }).then((response) => {
                    console.log(response);
                     this.setState((prevState, props) => {
                         return({ camps : response.data, isAvailable : true });
                     });
                }).catch((error) => {
                    console.log(error);
                });
            }

    prepareCampList(){
        let rows = [];
        if(this.state.isAvailable){
            console.log(this.state.camps);
            let campData = this.state.camps;
            for( let i = 0; i< Object.keys(campData).length; i++){
                rows.push(
                    <CampCard
                        camp_id={campData[i].camp_id} 
                        campName={campData[i].name}
                        phone={ campData[i].phone }
                        campLocation={ campData[i].location }
                        campDate={ campData[i].cdate } />
                )
            }   
            return rows;
        }else{
            return( <h2> No Data to Display </h2>);
        }
    }
    render(){
        return(
            <div className="container">
            <Row>
                <p className="card_title ">Upcoming Camps</p>
            </Row>
            <Row> 
            { this.state.isAvailable ? this.prepareCampList() : this.loadCampList() }
            </Row>
            </div>
        )
    }
}

export default Camps;