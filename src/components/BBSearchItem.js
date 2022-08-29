import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import {Link} from 'react-router';


const fucia = {
    'background'    : '#ff5e62',
    'border-radius' : '50px',
    'padding'       : '10px',
    'margin'        : '5px',
    'font-size'     : '15px',
}

const grey = {
    'background'    : '#a4a6a8',
    'border-radius' : '50px',
    'padding'       : '10px',
    'margin'        : '5px',
    'font-size'     : '15px',
}

class BBSearchItem extends Component{

    render(){
        return(
            <div>
                <Row className="valign-wrapper">
                    <Col s={12} m={4} l={4} >
                        <p className="_title">{ this.props.name }</p>
                        <p className="_caption valign-wrapper m5top">
                            <i className="tiny material-icons">location_on</i> 
                            &nbsp;{ this.props.city }
                        </p>
                    </Col>
                    <Col s={12} m={5} l={6}>
                        <p className="white-text">
                            <span style = { parseFloat(this.props.ap) > 0 ? fucia : grey }>A+</span>
                            <span style = { parseFloat(this.props.an) > 0 ? fucia : grey }>A-</span>
                            <span style = { parseFloat(this.props.bp) > 0 ? fucia : grey }>B+</span>
                            <span style = { parseFloat(this.props.bn) > 0 ? fucia : grey }>B-</span>
                            <span style = { parseFloat(this.props.abp) > 0 ? fucia : grey }>AB+</span>
                            <span style = { parseFloat(this.props.abn) > 0 ? fucia : grey }>AB-</span>
                            <span style = { parseFloat(this.props.op) > 0 ? fucia : grey }>O+</span>
                            <span style = { parseFloat(this.props.o_n) > 0 ? fucia : grey }>O-</span>
                        </p>
                    </Col>
                    <Col s={12} m={3} l={2}>
                        <Link to={ '/bloodbank/'+this.props.bbid } className="waves-effect waves-light btn red accent-2">view</Link>
                    </Col>
                </Row>
                <div className="divider m10top"/>
            </div>
        )
    }
}

export default BBSearchItem