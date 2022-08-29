import React, {Component} from 'react'
import {Tabs, Tab} from 'react-materialize'
import BloodBanks from './BloodBanks'
import Camps from './Camps'
import {Link} from 'react-router'

 class Home extends Component{

  constructor(){
    super();
    this.state = {
      screen: 0
    }
  }

  getScreen(){
    switch (this.state.screen){
      case 0:
        return <Camps/>
      case 1: 
        return <BloodBanks/>
      default:
        return <h1> SomeThing Went Wrong! </h1>
    }
  }

  handleChange = (tabId) =>{
    let screenId  = parseInt(tabId, 10)%10
    this.setState((prevState, props) => {
      return {screen: screenId}     
    });
  }

    render(){
        return(
            <div>
              
                <nav className="nav-extended fucia">
                <div className="nav-wrapper fucia">
                  <a href="" className="m20left main_logo">Welcome </a>
                  <ul id="nav-mobile" className="right">
                    <li><Link to="/login">Login</Link></li>
                  </ul>
                </div>
                <div className="nav-content">
                  <Tabs className="tabs tabs-transparent m0" onChange={this.handleChange}>
                    <Tab title="Camps"></Tab>
                    <Tab title="Blood Banks"></Tab>
                  </Tabs>
                </div>
              </nav>
  
          { this.getScreen() }
        </div>
        )
    }
}

export default Home;