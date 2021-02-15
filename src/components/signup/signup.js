import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { createUser } from '../../services/UserService';
import ToastComponent from '../toast-alert';

class PortalSignUp extends Component {

    state = {
        email: '',
        password: '',
        username: '',
        isAdmin: false,
        showToast: false,
        toastMessage: '',
        autohide: false
    }

    handleSignUp = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            isAdmin: this.state.isAdmin
        }
        const response = await createUser(user);
        this.setState({
            showToast: true,
            toastMessage: 'Your account has been created and logged in successfully',
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
        
    }
    
    handleUserCred = (event, credType) => {
        if (credType === 'email') 
            this.setState({
                email: event.target.value
            });
        else if (credType === 'password')
            this.setState({
                password: event.target.value
            });
        else if (credType === 'username')
            this.setState({
                username: event.target.value
            })
        else this.setState({
            isAdmin: this.state.isAdmin?false:true
        })
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
                <div className='p-5 signin-group rounded bg-light '>
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
                        <Form.Group>
                            <Form.Control size='sm' type='text' placeholder='Username' onChange={e => this.handleUserCred(e, 'username')}/>
                        </Form.Group>
                        <span>
                            <input type='radio' id='role' onClick={e => this.handleUserCred(e, 'role')} checked={this.state.isAdmin}/>
                            <label htmlFor='role'>Admin</label>
                        </span>
                        <Button className='ml-5 signin-group' type='submit' title='Login' style={{backgroundColor: '#752e97', border: 'none'}} onClick={(e) => this.handleSignUp()} disabled={this.state.email === '' || this.state.password === '' || this.state.username === ''}>
                            Sign up
                        </Button>
                    </div>
                </div>
                <ToastComponent autohide={this.state.autohide} showToast={this.state.showToast} toastMessage = {this.state.toastMessage} closeToast = {this.closeToast}/>
            </div>
        )
    }
}

export default PortalSignUp;