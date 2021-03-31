import React, { useState } from 'react';
// import Card from '../UI/card';
import FloatingInput from '../../FormElement/FloatingInput/floatingInput';
import './loginScreen.css';
import * as actions from '../../Store/Actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const LoginScreen = props => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = () => {
        let users = JSON.parse(localStorage.getItem('users'))
        for(let user in users){
            if(users[user].email === email && users[user].password=== password){
                props.loginSuccessHandler()    
            }
        }
    }
    const onChangeHandler = (event) => {
        if(event.target.id === 'emailfloatingInput'){
            setEmail(event.target.value)
        }else if(event.target.id === 'passwordfloatingInput'){
            setPassword(event.target.value)
        }
    }
    return (
        <div className="container h-100" style={{ marginTop: '100px' }}>
            <div className="d-flex justify-content-center h-100">
                <div className="login_user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png" className="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <form>
                            <div className="input-group">
                                <FloatingInput onChange={onChangeHandler} value={email} type='email' label='Email' placeholder='name@example.com' id="emailfloatingInput" for="floatingInput" />
                                {/* <input type="text" name="" className="form-control input_user" value="" placeholder="username" /> */}
                            </div>
                            <div className="input-group mb-2 mt-2">
                                {/* <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div> */}
                                <FloatingInput onChange={onChangeHandler} value={password} type='password' label='Password' placeholder='name@example.com' id="passwordfloatingInput" for="floatingInput" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button type="button" name="button" className="btn login_btn" onClick={loginHandler}>Login</button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-4">
                        <div className="d-flex justify-content-center links">
                            Don't have an account? <a href="/signup" className="ml-2">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center links">
                            <a href="# ">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loginSuccessHandler : () =>dispatch(actions.loginSuccessHandler())
    }
}

export default connect(null,mapDispatchToProps)(withRouter(LoginScreen))