import React, {Component} from 'react'

class DRecordItem extends Component{

    handleClick = () => {
        console.log('clicked from item');
        this.props.onClickEdit(this.props.recordId);
    }
    render(){
        return(
            // onClick={ this.handleClick }
            <tr >
                <td> { this.props.did } </td>
                <td> { this.props.name } </td>
                <td> { this.props.date } </td>
                <td> { this.props.btype} </td>
                <td> { this.props.qty } ml</td>
                <td> { this.props.nurse }</td>
            </tr>
        )
    }
}

export default DRecordItem