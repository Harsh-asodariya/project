import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigationItem.css';

const navigationItem = (props) => {
    return (
        <div>
        <li className="nav-item" >
            <NavLink activeClassName='active' className="nav-link" to={props.link} style={{ color: 'black', fontWeight: 'bold' }}>{props.children}</NavLink>
        </li>
        </div>
    )
}

export default navigationItem;