import React from 'react';
// import Card from '../UI/card';
import FloatingInput from '../../FormElement/FloatingInput/floatingInput';
import './signUpScreen.css'

const signUpScreen = props => {
    return (
        <div className="container h-100" style={{ marginTop: '100px' }}>
            <div className="d-flex justify-content-center h-100">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png" className="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <form>
                            <div className="input-group">
                                <FloatingInput type='email' label='Email' placeholder='name@example.com' id="emailfloatingInput" for="floatingInput" />
                                {/* <input type="text" name="" className="form-control input_user" value="" placeholder="username" /> */}
                            </div>
                            <div className="input-group mb-2 mt-2">
                                {/* <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div> */}
                                <FloatingInput type='password' label='Password' placeholder='name@example.com' id="passwordfloatingInput" for="floatingInput" />
                            </div>
                            <div className="input-group mb-2 mt-2">
                                {/* <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div> */}
                                <FloatingInput type='password' label='Re-Enter Password' placeholder='name@example.com' id="reenterpasswordfloatingInput" for="floatingInput" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button type="button" name="button" className="btn login_btn">Sign Up</button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-4">
                        <div className="d-flex justify-content-center links">
                            Already have an account? <a href="/login" className="ml-2">Login</a>
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

export default signUpScreen;