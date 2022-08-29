import React, {Component} from 'react'

class NurseListItem extends Component{

    handleCLick = () => {
        if (typeof this.props.editCallBack === 'function') {
            this.props.editCallBack(this.props.nid);
        }
        
    }
    render(){
        return(
            <tr onClick={ this.handleCLick }>
                <td> { this.props.nid } </td>
                <td> { this.props.name } </td>
                <td> { this.props.gender } </td>
                <td> { this.props.location} </td>
                <td> { this.props.phone }</td>
                <td> { this.props.email }</td>
                <td> { this.props.date }</td>
            </tr>
        )
    }
}

export default NurseListItem