import React, { useState } from 'react';
import FloatingInput from '../FormElement/FloatingInput/floatingInput';
import './changePassword.css';
import * as actions from '../Store/Actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';
import NavigationItems from '../Navigation/NavigationItems/navigationItems';
import { changePassword } from '../Api/Api';
import BackDrop from '../Shared/Backdrop/Backdrop'; 
import Spinner from '../Shared/Spinner/Spinner';

const ChangePassword = props => {

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const[isLoading,setIsLoading] = useState(false)

    const passwordChangeHandler = () => {
        if (password.newPassword === password.confirmPassword) {
            let data = {
                "oldPassword": password.currentPassword,
                "newPassword": password.newPassword
            }
            setIsLoading(true)
            changePassword(data)
                .then(res => {
                    setIsLoading(false)
                    localStorage.setItem('token', res.token)
                    props.passwordChangeHandler(res.token)
                    props.history.push('/dashboard')
                })
                .catch(err => {
                    setIsLoading(false)
                    alert(err.message)})
            
        } else {
            alert('Password does not match')
        }
    }
    const onChangeHandler = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value })
    }

    return (
        <>
            <BackDrop show={isLoading}><Spinner/></BackDrop>
            <div className='changePassword'>
                <NavigationItems />
                <div className="changePasswordBox w-100 mx-auto">
                    <div className='formBox'>
                        <form>
                            <FloatingInput classes='border-top-0 border-left-0 border-right-0 rounded-0' autoComplete="cc-csc" onChange={onChangeHandler} value={password.currentPassword} type='password' name='currentPassword' label='Current Password' placeholder='Enter currentPassword' id="currentPasswordfloatingInput" for="floatingInput" />
                            <FloatingInput classes='border-top-0 border-left-0 border-right-0 rounded-0' autoComplete="cc-csc" onChange={onChangeHandler} value={password.newPassword} type='password' name='newPassword' label='New Password' placeholder='Enter newPassword' id="newPasswordfloatingInput" for="floatingInput" />
                            <FloatingInput classes='border-top-0 border-left-0 border-right-0 rounded-0' autoComplete="cc-csc" onChange={onChangeHandler} value={password.confirmPassword} type='password' name='confirmPassword' label='Confirm Password' placeholder='Confirm Password' id="confirmPasswordfloatingInput" for="floatingInput" />
                            <Button color="primary" onClick={passwordChangeHandler} className='loginButton'>Chnage password</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        passwordChangeHandler: (data, props) => dispatch(actions.passwordChangeHandler(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword))