import React from 'react';

import Card from '../UI/card';
import './auth.css';
import {withRouter} from 'react-router-dom'

const Auth = props => {
  const loginHandler = () => {
    props.history.push('/login')
  }
  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button className='btn btn-primary' onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default withRouter(Auth);