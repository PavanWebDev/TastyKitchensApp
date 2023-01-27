/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {itemDetails} = props
  const {id, imageUrl, name, cuisine, userRatings} = itemDetails
  const {rating, totalReviews} = userRatings
  return (
    <Link to={`/restaurant/${id}`}>
      <li className="rest-item" testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="rest-img" />
        <div className="details-cont">
          <h1>{name}</h1>
          <p>{cuisine}</p>
          <div className="ratings-cont">
            <AiFillStar color="gold" size="25px" />
            <p className="rtg-txt">{rating}</p>
            <p className="reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
