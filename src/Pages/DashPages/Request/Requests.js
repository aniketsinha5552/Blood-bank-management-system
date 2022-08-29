import React, {Component} from 'react'
import {Row} from 'react-materialize'

class Requests extends Component{
    
    render(){
        return(
            <div className="basic_card pad20 card-2 m20top">
            <Row>
                    <p className="card_title m0top">Blood Requests</p>
                    <hr className="_small_line" />  
                </Row>
        </div>
        )
    }
}

export default Requests