import React, {Component} from 'react'
import {Row,Col} from 'react-materialize'

class BloodRequestRow extends Component{

    render(){
        return(
            <div>
            <Row className="valign-wrapper">
                <Col s={12} m={5} l={5} >
                    <p className="_title">{ this.props.name }</p>
                    <p className="_caption valign-wrapper m5top">
                        <i className="tiny material-icons">location_on</i> 
                        &nbsp;{ this.props.location }
                    </p>
                </Col>
                <Col s={12} m={4} l={5}>
                    <p className="white-text">
                        <span className="circle-text fucia">{this.props.blood_type}</span>
                    </p>
                </Col>
                <Col s={12} m={3} l={2}>
                    <Button className="waves-effect waves-light red accent-2">Supply</Button>
                    <Button className="waves-effect waves-light red accent-2">Cancel</Button>
                </Col>
            </Row>
            <div className="divider m20top"/>
        </div>
        )
    }
}