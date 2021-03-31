import React, { Component } from 'react';
import Select from 'react-select';
import {Label} from 'reactstrap';

// const Checkbox = props => <input type="checkbox" {...props} />;

// const Note = ({ Tag = 'div', ...props }) => (
//     <Tag
//         css={{
//             color: 'hsl(0, 0%, 40%)',
//             display: 'inline-block',
//             fontSize: 12,
//             fontStyle: 'italic',
//             marginTop: '1em',
//         }}
//         {...props}
//     />
// );

class SelectField extends Component {
    handleChange = (event, name) => {
        this.props.onChange(event,name)
    }   
    // toggleClearable = () =>
    //     this.setState({ isClearable: !this.state.isClearable })

    // toggleDisabled = () =>
    //     this.setState({ isDisabled: !this.state.isDisabled });

    // toggleLoading = () =>
    //     this.setState({ isLoading: !this.state.isLoading });

    // toggleRtl = () =>
    //     this.setState({ isRtl: !this.state.isRtl });

    // toggleSearchable = () =>
    //     this.setState({ isSearchable: !this.state.isSearchable });

    render() {
        let selectedOption
        if(this.props.value !== ""){
            
            let options = this.props.options
            for(let index in options){
                if(options[index].value === this.props.value){
                    selectedOption=index;
                    break;
                }
            }
        }
        return (
            <div>
                <Label for={this.props.for} className='fw-bold text-black '>
                    {this.props.label}
                    <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span>
                </Label>
                <Select
                    id={this.props.id}
                    onChange={(event) => this.handleChange(event,this.props.name)}
                    className='basic-single'
                    classNamePrefix='select'
                    // isDisabled={this.state.isDisabled}
                    // isLoading={this.state.isLoading}
                    // isClearable={this.state.isClearable}
                    // isRtl={this.state.isRtl}
                    // isSearchable={this.state.isSearchable}
                    defaultValue={this.props.options[selectedOption]} 
                    name={this.props.name}
                    options={this.props.options}
                />
                {/* <Note Tag="label">
                    <Checkbox
                        checked={this.state.isClearable}
                        onChange={this.toggleClearable}
                        id="cypress-single__clearable-checkbox"
                    />
          Clearable
        </Note>
                <Note Tag="label" style={{ marginLeft: '1em' }}>
                    <Checkbox
                        checked={this.state.isSearchable}
                        onChange={this.toggleSearchable}
                        id="cypress-single__searchable-checkbox"
                    />
          Searchable
        </Note>
                <Note Tag="label" style={{ marginLeft: '1em' }}>
                    <Checkbox
                        checked={this.state.isDisabled}
                        onChange={this.toggleDisabled}
                        id="cypress-single__disabled-checkbox"
                    />
          Disabled
        </Note>
                <Note Tag="label" style={{ marginLeft: '1em' }}>
                    <Checkbox
                        checked={this.state.isLoading}
                        onChange={this.toggleLoading}
                        id="cypress-single__loading-checkbox"
                    />
          Loading
        </Note>
                <Note Tag="label" style={{ marginLeft: '1em' }}>
                    <Checkbox
                        type="checkbox"
                        checked={this.state.isRtl}
                        onChange={this.toggleRtl}
                        id="cypress-single__rtl-checkbox"
                    />
          RTL
        </Note> */}
            </div>
        )
    }
}

export default SelectField;