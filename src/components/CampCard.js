import React, {Component} from 'react'
import {Row, Col} from 'react-materialize'

const style={
    margin : '0px'
}

class CampCard extends Component{

    render(){
        return(
            <Col s={12} m={6} l={4}>
            <div className="grad_top_card card-2">
                <div className="basic_card ">
                    <p className="_title">{ this.props.campName }</p>
                    <p className="_caption">{ this.props.campCaption }</p>
                    <p className="_caption valign-wrapper"><i className="tiny material-icons">location_on</i> &nbsp;{ this.props.campLocation }</p>
                    <p className="_date valign-wrapper" style={style}><i className="tiny material-icons">access_time</i> &nbsp;{ this.props.campDate }</p>
                    <Row className="m0 pad10">
                    </Row>
                </div>
            </div>
        </Col>
        )
    }
}

export default CampCard