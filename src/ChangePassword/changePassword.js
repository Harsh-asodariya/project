import React, { useState } from 'react';
// import Card from '../UI/card';
import FloatingInput from '../FormElement/FloatingInput/floatingInput';
import './changePassword.css';
import * as actions from '../Store/Actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';
import axios from 'axios';
import NavigationItems from '../Navigation/NavigationItems/navigationItems';

const ChangePassword = props => {

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const passwordChangeHandler = () => {
        if (password.newPassword === password.confirmPassword) {
            let data = {
                "oldPassword": password.currentPassword,
                "newPassword": password.newPassword
            }
            const headers = {
                'Content-Type': 'application/json',
                'x-token': props.token
            }
            axios.post('http://localhost:3000/api/person/changePassword', data, { headers: headers })
                .then(res => {
                    if (res.data.success === true) {
                        alert('success')
                        localStorage.setItem('token', res.data.data.token)
                        props.passwordChangeHandler(res.data.data.token)
                        props.history.push('/dashboard')
                    }
                })
                .catch(res => console.log(res))
        } else {
            console.log(props.token)
            alert('Password does not match')
        }
        // axios.post('http://localhost:3000/pub/login', userDetail)
        //     .then(res => {
        //         if (res.data.success === true) {
        //             props.loginSuccessHandler(res.data.data.token, res.data.data.personData)
        //         }
        //     }).catch(err => {
        //         console.log(err)
        //     })

        // let users = JSON.parse(localStorage.getItem('users'))
        // for (let user in users) {
        //     if (users[user].email === email && users[user].password === password) {
        //         props.loginSuccessHandler()
        //     }
        // }
    }
        const onChangeHandler = (event) => {
            setPassword({ ...password, [event.target.name]: event.target.value })
        }
        return (
            <>
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