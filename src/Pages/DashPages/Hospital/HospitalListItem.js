import React, {Component} from 'react'

class HospitalListItem extends Component{

    handleCLick = () => {
        if (typeof this.props.editCallBack === 'function') {
            this.props.editCallBack(this.props.hid);
        }
        
    }
    render(){
        return(

            <tr onClick={ this.handleCLick }>
                <td> { this.props.hid } </td>
                <td> { this.props.name } </td>
                <td> { this.props.phone } </td>
                <td> { this.props.location} </td>
                <td> { this.props.address }</td>
            </tr>
        )
    }
}

export default HospitalListItem;