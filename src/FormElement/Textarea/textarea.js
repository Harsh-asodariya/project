import React, { Component } from 'react';
import { Label } from 'reactstrap';

class Input extends Component {

    render() {
        return (
            <div>
                <Label for={this.props.for} className='fw-bold text-black '>
                    {this.props.label}
                    <span style={{ color: 'red', fontSize: '17px' }}><sup>*</sup></span>
                </Label>
                <textarea
                    className={'form-control '+this.props.error}
                    name={this.props.name}
                    id={this.props.id}
                    value={this.props.value}
                    onChange={this.props.changed}
                    placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}

export default Input;