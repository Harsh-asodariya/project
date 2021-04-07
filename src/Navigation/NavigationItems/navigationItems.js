import React, { useState } from 'react';
import './navigationItems.css';
import NavigationTop from '../NavigationTop/navigationTop';
import { NavLink, Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle } from 'reactstrap';

const NavigationItems = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <NavigationTop />

            {/* <ul className="nav nav-tabs bg-primary">
                <li>
                <NavigationItem link='/dashboard'>Dashboard</NavigationItem></li>
                <li> <NavigationItem link='/campaigns'>Campaigns</NavigationItem></li>
                <li> <NavigationItem link='/advertiser'>Advertiser</NavigationItem></li>
                <div style={{ position: 'absolute', top: '0%', right: '0%' }}>
                <li>  <NavigationItem link='/order'>+Order</NavigationItem></li>
                </div>
            </ul> */}

            <div>
                <Navbar className="bottomNavigationbar" light expand="md">
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <NavLink className='nav-link' activeClassName='active' to="/dashboard"><i className="fa fa-tachometer"></i>Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i className="fa fa-fire"></i>Campaigns
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <NavItem>
                                                <NavLink className='nav-link' activeClassName='active' to="/videosinproduction">Videos In Production</NavLink>
                                            </NavItem>

                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavItem>
                                                <NavLink className='nav-link' activeClassName='active' to="/campaignsInMarket">Campaigns In Market</NavLink>
                                            </NavItem>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavItem>
                                            <NavLink className='nav-link' activeClassName='active' to="/completedCampaign">Completed Campaigns</NavLink>
                                        </NavItem>
                                        
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' activeClassName='active' to="/advertiser"><i className="fa fa-user"></i>Advertiser</NavLink>
                            </NavItem>
                            <NavItem className="orderNavItem">
                                <NavLink className='nav-link' activeClassName='active' to="/order"><i className="fa fa-plus"></i>Order</NavLink>
                            </NavItem>
                        </Nav >
                    </Collapse>
                </Navbar>
            </div>

        </div>
    )
}

export default NavigationItems;
