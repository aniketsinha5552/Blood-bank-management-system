import React, {Component} from 'react';
import {Button} from 'react-materialize';
import TransferRecord from './transferRecord';
import CreateRecord from './createRecord';
import UpdateRecord from './transferUpdate';


class Transfer extends Component{

    constructor(props){
        super(props);
        this.state = {
            screenId : 0,
            tid : ''
        }
    }
    getCurrentView(){
        if(this.state.screenId === 1)
            return <CreateRecord closeCallBack={ this.closeCallBack }/>;
        else if(this.state.screenId === 2)
            return <UpdateRecord tid={this.state.tid} closeCallBack={ this.closeCallBack } />

        return <TransferRecord editCallBack={ this.editCallBack } closeCallBack={ this.closeCallBack } />;
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

    editCallBack = (tid) =>{
        this.setState((prevState, props) => {
            return { screenId: 2, tid: tid}
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

export default Transfer;
