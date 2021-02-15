
import React from 'react';
import { Table } from 'react-bootstrap';

class PortalScreen extends React.Component{
  state = {
    userData: [],
    isAdmin: false
  }

  componentDidMount = () => {
    this.setState({
      userData: this.props.location.query.userData,
      isAdmin: this.props.location.query.user.isAdmin
    })
  }

    render() {
        return (
            <div className='d-flex justify-content-center login-section'>
                <div className='p-5 rounded bg-light '>
                    <h5>Welcome to {this.state.isAdmin? 'Admin': 'User'} portal</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.userData.map( user => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin? 'Admin': 'Non-Admin'}</td>
                      </tr>
                    ))}

                  </tbody>
                </Table>
                </div>
            </div>
        )
    }
}

export default PortalScreen;