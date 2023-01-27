/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Counter from '../Counter'
import './index.css'

class FoodItem extends Component {
  state = {isClicked: false, quantity: 0}

  itemAddedToCart = () => {
    const {foodDetails, onClickAddItem} = this.props
    const {quantity} = this.state
    onClickAddItem(foodDetails, quantity)
  }

  onClickPlus = () => {
    const {quantity} = this.state
    this.setState(
      {quantity: quantity + 1, isClicked: true},
      this.itemAddedToCart,
    )
  }

  onClickMinus = () => {
    const {quantity} = this.state
    if (quantity !== 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    } else {
      this.setState({isClicked: false, quantity: 0})
    }
  }

  render() {
    const {isClicked, quantity} = this.state
    const {foodDetails} = this.props
    const {imageUrl, name, rating, cost} = foodDetails
    return (
      <li className="food-item" testid="foodItem">
        <img src={imageUrl} alt="food item" />
        <div className="food-details">
          <h1>{name}</h1>
          <p>&#8377; {cost}.00</p>
          <div>
            <AiFillStar color="gold" size="18px" />
            <p>{rating}</p>
          </div>
          {isClicked ? (
            <Counter
              quantity={quantity}
              onClickPlus={this.onClickPlus}
              onClickMinus={this.onClickMinus}
            />
          ) : (
            <button
              type="button"
              onClick={this.onClickPlus}
              className="add-btn"
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
