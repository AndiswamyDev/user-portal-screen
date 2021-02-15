import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getUserData } from '../../services/UserService';
import ToastComponent from '../toast-alert';

class PortalLogin extends Component {

    state = {
        email: '',
        password: '',
        showToast: false,
        toastMessage: '',
        autohide: false
    }

    handleLogin = async (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        const response = await getUserData(user);
        if ( response !== '' ) {
            const data = {
                userData: response,
                user: user
            }
            this.setState({
                showToast: true,
                toastMessage: 'Logged in successfully',
            });
            setTimeout(() => {
                this.props.history.push({
                    pathname: '/user',
                    query: {
                        userData: response,
                        user: user
                    }
                });
            }, 3000);
        } else {
            this.setState({
                showToast: true,
                toastMessage: 'User does not exists, kinldy signup',
            });
        }
    }
    
    handleUserCred = (event, credType) => {
        if (credType === 'email') 
            this.setState({
                email: event.target.value
            });
        else 
            this.setState({
                password: event.target.value
            });
    }

    closeToast = () => {
        this.setState({
            showToast: false,
            toastMessage: '',
            autohide: false
        });
    }

    render() {
        return (
            <div className='d-flex justify-content-center login-section'>
                <div className='p-5 login-group rounded bg-light '>
                    <span style={{color: '#752e97'}}>
                        <FontAwesomeIcon className='login-user-icon' icon={faUser}/>
                    </span>
                    <div className='mt-2'>
                        <Form.Group>
                            <Form.Control size='sm' type='email' placeholder='Email' onChange={e => this.handleUserCred(e, 'email')} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control size='sm' type='password' placeholder='Password' onChange={e => this.handleUserCred(e, 'password')}/>
                        </Form.Group>
                        <a href='/signup' className=''>Sign up</a>
                        <Button className='ml-5' type='submit' title='Login' style={{backgroundColor: '#752e97', border: 'none'}} onClick={(e) => this.handleLogin(e)} disabled={this.state.email === '' || this.state.password === ''}>
                            Login
                        </Button>
                    </div>
                </div>
                <ToastComponent autohide={this.state.autohide} showToast={this.state.showToast} toastMessage = {this.state.toastMessage} closeToast = {this.closeToast}/>
            </div>
        )
    }
}

export default PortalLogin;