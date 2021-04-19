import React, { Component } from 'react';
import Select from 'react-select';
import {Label} from 'reactstrap';

class SelectField extends Component {
   

    handleChange = (event, name) => {
        this.props.onChange(event,name)
    }

    render() {
        return (
            <div>
                <Label for={this.props.for} className='fw-bold text-black '>
                    {this.props.label}
                    <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span>
                </Label>
                <Select
                    id={this.props.id}
                    value={this.props.value}
                    onChange={(event) => this.handleChange(event,this.props.name)}
                    className='basic-single'
                    classNamePrefix='select'
                    name={this.props.name}
                    options={this.props.options}
                    isDisabled={this.props.disabled}
                
                />
            </div>
        )
    }
}

export default SelectField;