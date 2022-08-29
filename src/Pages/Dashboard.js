import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import DashView from './DashPages/DashView';
import Donation from './DashPages/Donation/Donation';
import Campaign from './DashPages/Camps/Campaign';
import Nurses from './DashPages/Nurse/Nurses';
import Storage from './DashPages/Storage/Storage';
import Donors from './DashPages/Donor/Donors';
import Settings from './DashPages/Settings/Settings';
import Hospitals from './DashPages/Hospital/Hospitals';
import Transfer from './DashPages/Transfer/transfer';

import {Link} from 'react-router';
import Auth from '../auth';
var auth = new Auth();

const style = {
    "margin": "0px",
    "padding": "0px"
}



const menu = [
                ['dashview','DashBoard'],
                ['donors','Donors'],
                ['blooddonation','Blood Donation'],
                ['hospitals','Hospitals'],
                ['request','Blood Transfer'],
                ['nurses','Nurses'],
                ['storage','Blood Storage'],
                ['camps','Campaigns'],
                ['settings','Settings']
            ]

class Dashboard extends Component{


    getView(){
      console.log('bbid : '+auth.getBbid());
        switch(this.getCurrentPageId()){
            case 0:
                return <DashView/>;
            case 1:
                return <Donors/>;
            case 2:
                return <Donation/>;
            case 3:
                return <Hospitals/>
            case 4:
                return <Transfer/>;
            case 5:
                return <Nurses/>;
            case 6:
                return <Storage/>;
            case 7:
                return <Campaign/>;
            case 8:
                return <Settings/>;
            default:
                return <Donation/>;
            }
    }

    getActiveClass(index){
        if (index === this.getCurrentPageId()){
            console.log(index)
            return "collection-item active"
        }
        else return "collection-item"
    }

    getCurrentPageId(){
        if( !this.props.params.page)
            return 0
        for (var i = 0; i < menu.length; i++){
            if (menu[i][0] === this.props.params.page){
                return i
            }
        }
    }

    render(){
        return(
            <div>
                <div className="navbar-fixed">
                    <nav>
                    <div className="nav-wrapper fucia">
                    <a href="/" className="m20left main_logo">Blood Bank</a>
                    
                    </div>
                </nav>
                </div>

            <Row className="m0 p0">
                <Col s={12} m={3} l={2} className="white full-height card-1 fixed-nav m0 p0" style={style}>
                <div className="collection">
                        {
                            menu.map( (listValue, index) => {
                                return <Link to={'/dashboard/'+listValue[0]}  className={this.getActiveClass(index) } >{listValue[1]}</Link>
                                
                            })
                        }

                </div>
                </Col>
                <Col s={12} m={3} l={2} />
                <Col s={12} m={9} l={10} className="m0 p0">

                    {
                        this.getView(this.props.params.page)
                    }                   
                
                </Col>
            </Row>
            </div>
        )
    }
}

export default Dashboard;