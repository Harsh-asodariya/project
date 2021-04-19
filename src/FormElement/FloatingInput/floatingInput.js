import React, { Component } from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';
import './floatinginput.css'

class FloatingInput extends Component {

    render() {
        return (
            <div className='mb-3'>
                <Label for={this.props.for} className='fw-bold text-black '>
                    {this.props.label}
                    <span style={{ color: 'red', fontSize: '17px' }}><sup>*</sup></span>
                </Label>
                <Input
                    type={this.props.type}
                    className={this.props.classes}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    name={this.props.name}
                    autoComplete={this.props.autoComplete}
                    maxLength={this.props.maxLength}
                    disabled={this.props.disabled}
                    invalid={this.props.error}
                />
                <FormFeedback valid={!this.props.error}>{this.props.errrMessage}</FormFeedback>
            </div>
        )
    }
}

export default FloatingInput;