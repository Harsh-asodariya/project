import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';
import './floatinginput.css'

class FloatingInput extends Component {

    render() {
        // const inputClasses = ['form-control']

        return (
            // <div className='form-floating mb-3'>
            //     <input
            //         className={inputClasses.join(' ')}
            //         id={this.props.id}
            //         type={this.props.type}
            //         placeholder={this.props.placeholder}
            //         // value={this.props.value}
            //         // onChange={this.props.changed}
            //     />

            //     <label htmlFor={this.props.for}>{this.props.label}</label>
            // </div>
            <div className='mb-3'>
                {/* <div className="form-floating mb-3">
                    <input
                        type={this.props.type}
                        className="form-control"
                        id={this.props.id}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        name={this.props.name} />
                    <label
                        htmlFor={this.props.for}>
                        {this.props.label}
                    </label>
                </div> */}
                <Label for={this.props.for} className='fw-bold text-black '>
                    {this.props.label}
                    <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span>
                </Label>
                <Input
                    type={this.props.type}
                    className={this.props.classes+" "+this.props.error}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    name={this.props.name}
                    autoComplete={this.props.autoComplete}
                    maxLength={this.props.maxLength}
                    disabled={this.props.disabled}
                />
            </div>
        )
    }
}

export default FloatingInput;