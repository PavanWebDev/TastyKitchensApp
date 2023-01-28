/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const apiStatusTexts = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class RestaurantItemDetails extends Component {
  state = {
    itemDetails: {},
    foodItemsList: [],
    apiStatus: apiStatusTexts.initial,
  }

  componentDidMount() {
    this.getRestaurantItemDetails()
  }

  getRestaurantItemDetails = async () => {
    this.setState({apiStatus: apiStatusTexts.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      foodItems: data.food_items.map(eachItem => ({
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        rating: eachItem.rating,
      })),
      id: data.id,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }
    this.setState({
      itemDetails: updatedData,
      foodItemsList: updatedData.foodItems,
      apiStatus: apiStatusTexts.success,
    })
  }

  renderRestaurantDetailsLoadingView = () => (
    <div testid="restaurant-details-loader" className="restaurants-loader-cont">
      <Loader type="TailSpin" color="#F7931E" height={75} width={75} />
    </div>
  )

  renderRestaurantDetailsSuccessView = () => {
    const {itemDetails, foodItemsList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = itemDetails
    const onClickAddItem = (foodDetails, quantity) => {
      const cartList = JSON.parse(localStorage.getItem('cartData'))
      const cartItemsList = [...cartList, {...foodDetails, quantity}]
      localStorage.setItem('cartData', JSON.stringify(cartItemsList))
    }
    return (
      <>
        <div className="restaurant-details-cont">
          <img src={imageUrl} alt="restaurant" className="restaurant-img" />
          <div className="rest-details">
            <h1>{name}</h1>
            <p>{cuisine}</p>
            <p>{location}</p>
            <div className="rating-price">
              <div className="ratings-reviews">
                <div className="star-ratings">
                  <AiFillStar size="16px" color="white" />
                  <p>{rating}</p>
                </div>
                <p>{reviewsCount}+ Ratings</p>
              </div>
              <hr className="separator" />
              <div className="cost-detail">
                <p className="price-det">&#8377; {costForTwo}</p>
                <p className="price-desc">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-cont">
          {foodItemsList.map(eachFoodItem => (
            <FoodItem
              key={eachFoodItem.id}
              foodDetails={eachFoodItem}
              onClickAddItem={onClickAddItem}
            />
          ))}
        </ul>
      </>
    )
  }

  getRestaurantDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusTexts.success:
        return this.renderRestaurantDetailsSuccessView()
      default:
        return this.renderRestaurantDetailsLoadingView()
    }
  }

  render() {
    return (
      <>
        <Header isHome isCart={false} />
        {this.getRestaurantDetailsView()}
        <Footer />
      </>
    )
  }
}

export default RestaurantItemDetails
