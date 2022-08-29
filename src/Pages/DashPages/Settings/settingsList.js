import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import Auth from '../../../auth';
let auth = new Auth();

class SettingsList extends Component{

    openMEdit(){
        this.props.MeditCallBack();
    }

    openBEdit(){
        this.props.BeditCallBack();
    }
    logout(){
        auth.logout();
    }

    render(){
        return(
            <Row>
                <Row>
                    <p className="card_title m0top">Settings</p>
                    <hr className="_small_line" />  
                </Row>
                <Col s={12}>
                    <ul className="collection">
                        <li className="collection-item dismissable">
                            <div>Manager Details
                                <button className="secondary-content waves-effect waves-light btn red accent-2"
                                    onClick={
                                        (e)=>{
                                            this.openMEdit();
                                        }
                                    }>Edit</button>
                            </div>
                        </li>
                        <div className="divider m10top"/>
                        <li className="collection-item dismissable">
                            <div>BloodBank Details
                                <button className="secondary-content waves-effect waves-light btn red accent-2"
                                    onClick={
                                        (e)=>{
                                            this.openBEdit();
                                        }
                                    }>Edit</button>
                            </div>
                        </li>
                        <div className="divider m10top"/>
                        <li className="collection-item dismissable">
                            <div>Logout
                                <button className="secondary-content waves-effect waves-light btn red accent-2"
                                onClick={
                                        (e)=>{
                                            this.logout();
                                        }
                                    }>Logout</button>
                            </div>
                        </li>

                    </ul>
                </Col>
            </Row>
        );
    }

}

export default SettingsList;
