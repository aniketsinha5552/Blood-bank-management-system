import React, {Component} from 'react';
import {Row, Button} from 'react-materialize';
import DonationForm from './DonationForm';
import DonationRecord from './DonationRecord';
import DonationEdit from './DonationEdit';
import Auth from '../../../auth';
import Notifications, {notify} from 'react-notify-toast';

let auth = new Auth();

class Donation extends Component{

    constructor(){
        super()
        this.state = {
            screenId: 0,
            recordId: 0,
            bbid    : auth.getBbid()
        }
    }
    getCurrentView(){
        if(this.state.screenId === 1)
            return <DonationForm onCloseEdit={ this.onCloseEdit } notify={this.notifySuccess}/>
        else if(this.state.screenId === 2)
            return <DonationEdit onCloseEdit={ this.onCloseEdit } notify={this.notifySuccess} />

        return < DonationRecord onClickEdit={ this.openEdit } />
    }

    getButtonIcon(){
        if(this.state.screenId === 1 || this.state.screenId === 2) 
                    return "close"
        else return "add"
    }

    handleClick = () =>{
        let sid = this.state.screenId === 0 ? 1 : 0 ;
        this.setState((prevState, props) => {
          return { screenId: sid }     
        });
      }

    onCloseEdit = () =>{
        this.setState((prevState, props) => {
            return {screenId: 0}
        })
    }

    //call back to be passed down to list item to edit
    openEdit = (dId) => {
        console.log('Clicked at donation');
        this.setState((prevState, props) => {
            return { screenId: 2, recordId: dId }
        });
    }

    notifySuccess = (message)=>{
        notify.show(message,'success', 1000);
    }
    
    render(){
        return(
            <Row>
                <Notifications/>
                { this.getCurrentView() }
                <Button floating className='red' large style={{bottom: '45px', right: '24px', position: 'fixed'}} onClick={ this.handleClick }><i className="material-icons">{ this.getButtonIcon() }</i></Button>

            </Row>

        )
    }
}

export default Donation