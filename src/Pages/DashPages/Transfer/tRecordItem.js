import React, {Component} from 'react'

const green = {
    'color' : '#21b735'
}

const orange = {
    'color' : '#ed7f25'
}

const grey = {
    'color': '#918e8b'
}

class TRecordItem extends Component{

    handleCLick = () => {
        if (typeof this.props.editCallBack === 'function') {
            this.props.editCallBack(this.props.tid);
        }
        
    }

    getTextColor(text){
        if (text === 'SENT'){
            return green;
        }else if (text === 'PENDING'){
            return orange;
        }else{
            return grey;
        }
    }
    render(){
        return(
            <tr onClick={ this.handleCLick }>
                <td> { this.props.tid } </td>
                <td> { this.props.hid } </td>
                <td> { this.props.name } </td>
                <td> { this.props.date} </td>
                <td> { this.props.quantity }</td>
                <td> { this.props.blood }</td>
                <td style={ this.getTextColor(this.props.status) }> { this.props.status }</td>
            </tr>
        )
    }
}

export default TRecordItem;