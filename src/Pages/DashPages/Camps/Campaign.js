import React, {Component} from 'react';
import {Button} from 'react-materialize';
import CampList from './CampList';
import CreateCamp from './CreateCamp';
import CampEdit from './CampEdit';

class Campaign extends Component{

    constructor(props){
        super(props);
        this.state = {
            screenId : 0,
            camp_id : ''
        }
    }
    getCurrentView(){
        if(this.state.screenId === 1)
            return <CreateCamp closeCallBack={ this.closeCallBack }/>;
        else if(this.state.screenId === 2)
            return <CampEdit camp_id={this.state.camp_id} closeCallBack={ this.closeCallBack } />

        return <CampList editCallBack={ this.editCallBack } closeCallBack={ this.closeCallBack } />;
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

    editCallBack = (cid) =>{
        this.setState((prevState, props) => {
            return { screenId: 2, camp_id: cid}
        });
    }

    closeCallBack = () => {
        this.setState({ screenId : 0 });
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

export default Campaign
