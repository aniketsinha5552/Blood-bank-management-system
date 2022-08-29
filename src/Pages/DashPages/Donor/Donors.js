import React, {Component} from 'react';
import {Button} from 'react-materialize';
import DonorList from './DonorList';
import DonorRegistration from './DonorRegistration';
import DonorEdit from './DonorEdit';

class Donors extends Component{

    constructor(props){
        super(props);
        this.state = {
            screenId : 0,
            donorAdhaar : ''
        }
    }
    getCurrentView(){
        if(this.state.screenId === 1)
            return <DonorRegistration closeCallBack={ this.showListCallBack }/>;
        else if(this.state.screenId === 2)
            return <DonorEdit adhaar={this.state.donorAdhaar} closeCallBack={ this.showListCallBack }/>

        return <DonorList editCallBack={ this.editCallBack } />;
    }

    showListCallBack = () => {
        this.setState({ screenId: 0 });
    }

    getButtonIcon(){
        if(this.state.screenId === 1 || this.state.screenId === 2)
                    return "close";
        else return "add";
    }

    handleClick = () => {
        let sid = this.state.screenId === 0 ? 1 : 0 ;
        this.setState((prevState, props) => {
          return { screenId: sid }     
        });
      }

    editCallBack = (adhaar) =>{
        this.setState((prevState, props) => {
            return { screenId: 2, donorAdhaar: adhaar}
        });
    }
    

    render(){
        return(
            <div className="basic_card pad20 card-2 m20top">
                { this.getCurrentView() }
                <Button floating className='red' large style={{bottom: '45px', right: '24px', position: 'fixed'}} onClick={ this.handleClick }><i className="material-icons">{ this.getButtonIcon() }</i></Button>

            </div>
        )
    }
}

export default Donors
