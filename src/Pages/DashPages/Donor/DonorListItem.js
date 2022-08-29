import React, {Component} from 'react'

class DonorListItem extends Component{

    handleCLick = () => {
        if (typeof this.props.editCallBack === 'function') {
            this.props.editCallBack(this.props.adhaar);
        }
        
    }
    render(){
        return(

            <tr onClick={ this.handleCLick }>
                <td> { this.props.adhaar } </td>
                <td> { this.props.name } </td>
                <td> { this.props.age } </td>
                <td> { this.props.blood} </td>
                <td> { this.props.gender }</td>
                <td> { this.props.location }</td>
                <td> { this.props.phone }</td>
                <td> { this.props.email }</td>
            </tr>
        )
    }
}

export default DonorListItem