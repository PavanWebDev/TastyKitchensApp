import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({isError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-details">
          <div className="card-cont">
            <div className="logo-cont">
              <img
                src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672746641/logo_wqzjft.png"
                alt="website logo"
                className="logo"
              />
              <h1 className="logo-title">Tasty Kitchens</h1>
            </div>
            <h1 className="login-txt">Login</h1>
            <form onSubmit={this.onSubmitForm}>
              <label htmlFor="user">USERNAME</label>
              <input
                type="text"
                id="user"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUsername}
              />
              <label htmlFor="pass">PASSWORD</label>
              <input
                type="password"
                id="pass"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
              {isError && <p className="error">{errMsg}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="img-cont">
          <img
            src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672742515/Rectangle_1456_sbtwrd.png"
            alt="website login"
            className="login-img"
          />
        </div>
      </div>
    )
  }
}

export default Login
