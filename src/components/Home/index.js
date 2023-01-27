/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import {AiFillCaretDown} from 'react-icons/ai'
import Header from '../Header'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusTexts = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  infinite: true,
  appendDots: dots => (
    <div
      style={{
        backgroundColor: 'transparent',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '28px',
      }}
    >
      <ul style={{margin: '0px'}}> {dots} </ul>
    </div>
  ),
}

class Home extends Component {
  state = {
    offers: [],
    activePage: 1,
    selectedSortByValue: sortByOptions[0].value,
    restaurantsList: [],
    offersApiStatus: apiStatusTexts.initial,
    restaurantsApiStatus: apiStatusTexts.initial,
  }

  componentDidMount() {
    this.getOffersList()
    this.getRestaurantsList()
  }

  getOffersList = async () => {
    this.setState({offersApiStatus: apiStatusTexts.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedOffers = data.offers.map(eachOffer => ({
      imageUrl: eachOffer.image_url,
      id: eachOffer.id,
    }))
    this.setState({
      offers: updatedOffers,
      offersApiStatus: apiStatusTexts.success,
    })
  }

  getRestaurantsList = async () => {
    this.setState({restaurantsApiStatus: apiStatusTexts.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activePage, selectedSortByValue} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedRestaurantsList = data.restaurants.map(eachRestaurant => ({
      costForTwo: eachRestaurant.cost_for_two,
      cuisine: eachRestaurant.cuisine,
      groupByTime: eachRestaurant.group_by_time,
      hasOnlineDelivery: eachRestaurant.has_online_delivery,
      hasTableBooking: eachRestaurant.has_table_booking,
      id: eachRestaurant.id,
      imageUrl: eachRestaurant.image_url,
      isDeliveringNow: eachRestaurant.is_delivering_now,
      location: eachRestaurant.location,
      menuType: eachRestaurant.menu_type,
      name: eachRestaurant.name,
      opensAt: eachRestaurant.opens_at,
      userRatings: {
        rating: eachRestaurant.user_rating.rating,
        ratingColor: eachRestaurant.user_rating.rating_color,
        ratingText: eachRestaurant.user_rating.rating_text,
        totalReviews: eachRestaurant.user_rating.total_reviews,
      },
    }))
    this.setState({
      restaurantsList: updatedRestaurantsList,
      restaurantsApiStatus: apiStatusTexts.success,
    })
  }

  renderOffersLoadingView = () => (
    <div testid="restaurants-offers-loader" className="offers-loader-cont">
      <Loader type="TailSpin" color="#F7931E" height={75} width={75} />
    </div>
  )

  renderOffersSuccessView = () => {
    const {offers} = this.state
    return (
      <div className="offers-slider-container">
        <Slider {...settings}>
          {offers.map(eachItem => (
            <img key={eachItem.id} src={eachItem.imageUrl} alt="offer" />
          ))}
        </Slider>
      </div>
    )
  }

  getOffersView = () => {
    const {offersApiStatus} = this.state
    switch (offersApiStatus) {
      case apiStatusTexts.success:
        return this.renderOffersSuccessView()
      default:
        return this.renderOffersLoadingView()
    }
  }

  renderRestaurantsLoadingView = () => (
    <div testid="restaurants-list-loader" className="restaurants-loader-cont">
      <Loader type="TailSpin" color="#F7931E" height={75} width={75} />
    </div>
  )

  renderRestaurantsSuccessView = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurants-list">
        {restaurantsList.map(eachRestaurantItem => (
          <RestaurantItem
            key={eachRestaurantItem.id}
            itemDetails={eachRestaurantItem}
          />
        ))}
      </ul>
    )
  }

  getRestaurantsListView = () => {
    const {restaurantsApiStatus} = this.state
    switch (restaurantsApiStatus) {
      case apiStatusTexts.success:
        return this.renderRestaurantsSuccessView()
      default:
        return this.renderRestaurantsLoadingView()
    }
  }

  onChangeSortByOption = event => {
    const optionsElement = document.getElementById('sortOptions')
    optionsElement.classList.toggle('show')
    this.setState(
      {selectedSortByValue: event.target.textContent},
      this.getRestaurantsList,
    )
  }

  onClickNextPage = () => {
    const {activePage} = this.state
    if (activePage !== 4) {
      this.setState({activePage: activePage + 1}, this.getRestaurantsList)
    }
  }

  onClickPreviousPage = () => {
    const {activePage} = this.state
    if (activePage !== 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurantsList)
    }
  }

  onClickArrow = () => {
    const optionsElement = document.getElementById('sortOptions')
    optionsElement.classList.toggle('show')
  }

  render() {
    const {activePage, selectedSortByValue} = this.state
    return (
      <div className="home-cont">
        <Header isHome isCart={false} />
        {this.getOffersView()}
        <div className="restaurants-container">
          <h1>Popular Restaurants</h1>
          <div className="filter-container">
            <p>
              Select Your favorite restaurant special dish and make your day
              happy...
            </p>
            <div className="options-cont">
              <BsFilterLeft size="28px" />
              Sort by {selectedSortByValue}
              <button
                type="button"
                className="options-btn"
                onClick={this.onClickArrow}
              >
                <AiFillCaretDown size="20px" />
              </button>
              <ul id="sortOptions">
                {sortByOptions.map(eachItem => (
                  <li
                    key={eachItem.id}
                    onClick={this.onChangeSortByOption}
                    value={eachItem.value}
                  >
                    {eachItem.displayText}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr />
          {this.getRestaurantsListView()}
          <div className="page-controls">
            <button
              type="button"
              className="arrow-btn"
              onClick={this.onClickPreviousPage}
              testid="pagination-left-button"
            >
              <img
                src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672851403/Icon_idvoa9.png"
                alt="arrow"
              />
            </button>
            <div testid="active-page-number">{activePage} of 4</div>
            <button
              type="button"
              className="arrow-btn"
              onClick={this.onClickNextPage}
              testid="pagination-right-button"
            >
              <img
                src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672851403/Icon_idvoa9.png"
                alt="arrow"
                className="right-arw"
              />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home