import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

class Cart extends Component {
  state = {totalItemsCost: 0}

  componentDidMount() {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    let totalItemsCost = 0
    cartList.forEach(element => {
      totalItemsCost += element.cost * element.quantity
    })
    this.setState({totalItemsCost})
  }

  updateState = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    let totalItemsCost = 0
    cartList.forEach(element => {
      totalItemsCost += element.cost * element.quantity
    })
    this.setState({totalItemsCost})
  }

  onClickAdd = uniqueId => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.id === uniqueId) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    this.updateState()
  }

  onClickRemove = (uniqueId, quantity) => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    if (quantity === 1) {
      const updatedCartList = cartList.filter(
        eachItem => eachItem.id !== uniqueId,
      )
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === uniqueId) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
    this.updateState()
  }

  renderCartView = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const {totalItemsCost} = this.state
    if (cartList.length === 0) {
      return (
        <>
          <Header isHome={false} isCart />
          <div className="empty-view-cont">
            <img
              src="https://res.cloudinary.com/dcxurp30f/image/upload/v1672922182/Layer_2_nspaqd.png"
              alt="empty cart"
            />
            <h1>No Order Yet!</h1>
            <p>Your cart is empty. Add something from the menu.</p>
            <Link to="/">
              <button type="button" className="order-now-btn">
                Order Now
              </button>
            </Link>
          </div>
        </>
      )
    }
    return (
      <div className="cart-view-cont">
        <Header isHome={false} isCart />
        <ul className="cart-items-list">
          <li className="column-heads">
            <p>Item</p>
            <p>Quantity</p>
            <p>Price</p>
          </li>
          {cartList.map(eachItem => (
            <CartItem
              key={eachItem.id}
              eachItem={eachItem}
              onClickAdd={this.onClickAdd}
              onClickRemove={this.onClickRemove}
            />
          ))}
          <hr />
          <li className="cart-summary">
            <p>Order Total:</p>
            <p>₹ {totalItemsCost}.00</p>
          </li>
          <li className="order-btn">
            <button type="button" className="place-odr">
              Place Order
            </button>
          </li>
        </ul>
        <Footer />
      </div>
    )
  }

  render() {
    return <>{this.renderCartView()}</>
  }
}
export default Cart
