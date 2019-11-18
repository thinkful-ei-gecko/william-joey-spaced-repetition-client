import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className="link-logout"> 
        {/* <span>
          {this.context.user.name}
        </span> */}
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'
            className='logout-nav'  
          >
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
    <div className="links">
      <nav>
       
        <Link to='/login' className="login-nav">Login</Link>
       
        {' '}
        <Link to='/register' className="signup-nav">Sign up</Link>
      </nav>
    </div>
    )
  }

  render() {
    return (
      <header>
        <div className="flexBody">
          <h1 className="app-h1">
            <Link to='/'>
              Spaced repetition
            </Link>
          </h1>
          <div className="loginLinks">
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
            </div>
        </div>
      </header>
    );
  }
}

export default Header
