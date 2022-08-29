import React, {Component} from 'react'
import {Row, Col, Input, Button} from 'react-materialize'
// import Auth from '../../../auth';
// let auth = new Auth();

const Fridges = [
            'F1',
            'F2',
            'F3',
            'F4'
            ]
class DonationForm extends Component{

    componentWillMount(){
        // loadjs('..../public/js/materialize.min.js')
    }
    render(){
        return(
            <Row>
               
            <div className="basic_card m10top row pad20 card-1">
                <Row>
                    <p className="card_title m0top">Edit Donation Entry</p>
                    <hr className="_small_line" />  
                </Row>
                
                <Input s={12} m={6} type="tel" label="Aadhar Number" validate/>
                <Input s={12} m={6} type="text" label="Blood Type" disabled/>
                <Input s={12} m={6} type="number" label="Quantity in ml" validate/>
                <Input s={12} m={6} type="number" label="Nurse ID" validate/>
                <Col s={12} m={12} l={12}>
                    <p className=" pad10">Storage Fridge Number</p>
                </Col>

                <Col s={12} className="center">
                    
                    {
                            Fridges.map( (fid, index) => {
                                return <Input name="fridge" type='radio' value={fid} label={fid} />
                            })
                        }
                </Col>
        
        <Col s={7}/>
        <div className="col s5 m0 pad10 right">
            <Button className="m10 waves-effect waves-light red accent-2">Delete</Button>
            <Button className="m10 waves-effect waves-light red accent-2">Update</Button>
        </div>
        </div>        
        </Row>

        )
    }
}

export default DonationForm