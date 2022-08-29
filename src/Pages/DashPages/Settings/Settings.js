import React, {Component} from 'react';
import {Button} from 'react-materialize';
import EditManager from './editManager';
import EditBloodBank from './editBloodBank';
import SettingsList from './settingsList';

const hstyle = {
    'display' : 'none'
}

const vstyle = {
    'display' : 'block',
    'bottom'  : '45px', 
    'right'   : '24px',
    'position': 'fixed'
}


class Settings extends Component{

    constructor(props){
        super(props);
        this.state = {
            screenId : 0
        }
    }

    getCurrentView(){
        if(this.state.screenId === 1)
            return <EditBloodBank closeCallBack={ this.closeCallBack }/>;
        else if(this.state.screenId === 2)
            return <EditManager closeCallBack={ this.closeCallBack } />

        return <SettingsList MeditCallBack={ this.MeditCallBack } BeditCallBack={ this.BeditCallBack } />;
    }

    getButtonStyle(){
        return this.state.screenId === 0 ? hstyle : vstyle;
    }

    handleClick = () => {
        let sid = this.state.screenId === 0 ? 1 : 0 ;
        this.setState((prevState, props) => {
          return { screenId: sid }     
        });
      }

    MeditCallBack = () =>{
        this.setState((prevState, props) => {
            return { screenId: 2}
        });
    }

    BeditCallBack = () =>{
        this.setState((prevState, props) => {
            return { screenId: 1}
        });
    }

    closeCallBack = () => {
        this.setState({ screenId : 0 });
    }
    

    render(){
        return(
            <div className="basic_card pad20 card-2 m20top">
                { this.getCurrentView() }
                <Button floating className='red' 
                    large style={ this.getButtonStyle() } 
                    onClick={ this.handleClick }>
                        <i className="material-icons">close</i>
                </Button>

            </div>
        )
    }
}

export default Settings;
