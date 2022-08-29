import React, {Component} from 'react'

class CampListItem extends Component{

    handleCLick = () => {
        if (typeof this.props.editCallBack === 'function') {
            this.props.editCallBack(this.props.camp_id);
        }
        
    }
    render(){
        return(
            <tr onClick={ this.handleCLick }>
                <td> { this.props.camp_id } </td>
                <td> { this.props.name } </td>
                <td> { this.props.date } </td>
                <td> { this.props.location} </td>
                <td> { this.props.phone }</td>
                <td> { this.props.created }</td>
            </tr>
        )
    }
}

export default CampListItem;