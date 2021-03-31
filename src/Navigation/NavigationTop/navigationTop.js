import React, {useState} from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from '../../Assets/Images/logo.png';
import './navigationTop.css';
import bell from '../../Assets/Images/bell-solid.svg';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

function NavigationTop(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <div className='topNavigation'>
            <div className="logoDiv">
                <img alt="logo" className="logo-area" src={logo} />
            </div>
            <div className='circleButtonDiv'>
                <div>
                    <img alt='"bell' src={bell} className='bellSvg' />
                </div>
                <div className='butoonDropDown'>
                    <Button className='circleButton'>{props.firstName[0] + props.lastName[0]}</Button>

                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle
                            tag="span"
                            data-toggle="dropdown"
                            aria-expanded={dropdownOpen}
                        >
                            <i class="fa fa-chevron-down" style={{ color: 'black' }} ></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem tag={Link} to='/changePassword'>Profile</DropdownItem>
                            <DropdownItem>Change Password</DropdownItem>
                            <DropdownItem>SignOut</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div>
                    <p className='text-primary role m-0'>{props.role}</p>
                    <p className='email m-0'>{props.email}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        firstName: state.personData.firstName,
        lastName: state.personData.lastName,
        email: state.personData.email,
        role: state.personData.roleCode
    }
}

export default connect(mapStateToProps)(NavigationTop)
