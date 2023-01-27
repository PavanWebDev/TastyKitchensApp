import {Component} from 'react'
import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-logo-cont">
          <img
            src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672755139/Frame_275_npbx1a.png"
            alt="website-footer-logo"
            className="footer-logo"
          />
          <h1 className="footer-logo-title">Tasty Kitchens</h1>
        </div>
        <p className="txt1">
          The only thing we are serious about is food.
          <br /> Contact us on
        </p>
        <div className="socials">
          <FaPinterestSquare testid="pintrest-social-icon" />
          <FaInstagram testid="instagram-social-icon" />
          <FaTwitter testid="twitter-social-icon" />
          <FaFacebookSquare testid="facebook-social-icon" />
        </div>
      </div>
    )
  }
}

export default Footer
