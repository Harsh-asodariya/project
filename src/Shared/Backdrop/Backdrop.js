import React from 'react';
import './Backdrop.css';

const backDrop = (props) =>(
    props.show ? <div className='BackDrop'>{props.children}</div> : null
);

export default backDrop;