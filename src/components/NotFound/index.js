import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onClickHomePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-cont">
      <img
        src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672758002/erroring_1_otifls.png"
        alt="not found"
        className="not-found-img"
      />
      <h1>Page Not Found</h1>
      <p className="txt1">
        We are sorry, the page you requested could not be found.
      </p>
      <p className="txt2">Please go back to homepage</p>
      <Link to="/">
        <button
          type="button"
          onClick={onClickHomePage}
          className="home-page-btn"
        >
          Home page
        </button>
      </Link>
    </div>
  )
}

export default NotFound
