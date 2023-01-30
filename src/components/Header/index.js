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
  const activeHomeClass = isHome ? 'active-link' : ''
  const activeCartClass = isCart ? 'active-link' : ''
  return (
    <ul className="nav">
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
      <Link to="/">
        <li className={`home-link ${activeHomeClass}`}>Home</li>
      </Link>
      <Link to="/cart">
        <li className={`cart-link ${activeCartClass}`}>Cart</li>
      </Link>
      <li>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
