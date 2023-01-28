/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import './index.css'

class CartItem extends Component {
  state = {quantity: 0}

  componentDidMount() {
    const {eachItem} = this.props
    const {quantity} = eachItem
    this.setState({quantity})
  }

  updateState = uniqueId => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const updatedItem = cartList.filter(eachItem => eachItem.id === uniqueId)
    const {quantity} = updatedItem[0]
    this.setState({quantity})
  }

  onClickAddItem = () => {
    const {eachItem, onClickAdd} = this.props
    const {id} = eachItem
    onClickAdd(id)
    this.updateState(id)
  }

  onClickRemoveItem = () => {
    const {eachItem, onClickRemove} = this.props
    const {id} = eachItem
    const {quantity} = this.state
    if (quantity === 1) {
      onClickRemove(id, quantity)
    } else {
      onClickRemove(id, quantity)
      this.updateState(id)
    }
  }

  render() {
    const {eachItem} = this.props
    const {imageUrl, name, cost} = eachItem
    const {quantity} = this.state
    const totalPrice = cost * quantity
    return (
      <li className="cart-item" testid="cartItem">
        <div className="img-name">
          <img src={imageUrl} alt="cartItem" />
          <p className="title">{name}</p>
        </div>
        <div className="counter-cont">
          <button
            type="button"
            testid="decrement-count"
            onClick={this.onClickRemoveItem}
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            type="button"
            testid="increment-count"
            onClick={this.onClickAddItem}
          >
            +
          </button>
        </div>
        <p className="price">₹ {totalPrice}.00</p>
      </li>
    )
  }
}

export default CartItem
