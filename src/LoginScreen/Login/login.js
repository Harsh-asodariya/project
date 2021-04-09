import React, { useState } from 'react';
import FloatingInput from '../../FormElement/FloatingInput/floatingInput';
import './login.css';
import * as actions from '../../Store/Actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import logo from '../../Assets/Images/logo.png'
import { Button } from 'reactstrap';
import Spinner from '../../Shared/Spinner/Spinner';
import BackDrop from '../../Shared/Backdrop/Backdrop';
import { login } from '../../Api/Api';

const Login = props => {
    const [userDetail, setUserDetail] = useState({
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const loginHandler = () => {
        setIsLoading(true)
        login(userDetail)
            .then(res => {
                setIsLoading(false)
                props.loginSuccessHandler(res.token, res.personData)
            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })
    }
    const onChangeHandler = (event) => {
        setUserDetail({ ...userDetail, [event.target.name]: event.target.value })
    }
   
    return (
        <>
        <BackDrop show={isLoading} ><Spinner/></BackDrop>
            <div className="background">
                <div className="loginBox w-100 mx-auto">
                    <div className='imageBox'>
                        <img alt='Logo' src={logo} />
                    </div>
                    <div className='formBox'>
                        <form>
                            <FloatingInput classes='border-top-0 border-left-0 border-right-0 border-bottom rounded-0' onChange={onChangeHandler} value={userDetail.email} type='email' name='email' label='Email' placeholder='Enter email' id="emailfloatingInput" for="floatingInput" />
                            <FloatingInput classes='border-top-0 border-left-0 border-right-0 rounded-0' autoComplete="cc-csc" onChange={onChangeHandler} value={userDetail.password} type='password' name='password' label='Password' placeholder='Enter password' id="passwordfloatingInput" for="floatingInput" />
                            <Button color="primary" onClick={loginHandler} className='loginButton'>Login</Button>
                        </form>
                        <div className='text-center'>
                            <Button color="link" className='forgotPasswordButton'>Forgot password?</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loginSuccessHandler: (token, personData) => dispatch(actions.loginSuccessHandler(token, personData))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login))