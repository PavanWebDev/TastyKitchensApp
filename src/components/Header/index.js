import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const {isHome, isCart} = props
  return (
    <nav>
      <Link to="/">
        <li className="header-logo-cont">
          <img
            src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672746641/logo_wqzjft.png"
            alt="website logo"
            className="logo"
          />
          <p className="logo-title">Tasty Kitchens</p>
        </li>
      </Link>
      <ul className="nav-links">
        <Link to="/">
          <li className={isHome ? 'active-link' : ''}>Home</li>
        </Link>
        <Link to="/cart">
          <li className={isCart ? 'active-link' : ''}>Cart</li>
        </Link>
        <li>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
