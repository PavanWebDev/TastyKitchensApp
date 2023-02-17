/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

class Cart extends Component {
  state = {totalItemsCost: 0, isOrderPlaced: false}

  componentDidMount() {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    if (cartList === null || cartList === undefined) {
      const cart = []
      localStorage.setItem('cartData', JSON.stringify(cart))
    } else {
      let totalItemsCost = 0
      cartList.forEach(element => {
        totalItemsCost += element.cost * element.quantity
      })
      this.setState({totalItemsCost})
    }
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

  onClickPlaceOrder = () => {
    this.setState({isOrderPlaced: true})
    const cart = []
    localStorage.setItem('cartData', JSON.stringify(cart))
  }

  renderPaymentSuccessView = () => (
    <>
      <Header isHome={false} isCart />
      <div className="payment-success">
        <img
          src="https://res.cloudinary.com/dcxurp30f/image/upload/v1675015549/Vector_lkdnvm.png"
          alt="payment success"
        />
        <h1>Payment Successful</h1>
        <p>
          Thank you for ordering <br /> Your payment is successfully completed.
        </p>
        <Link to="/">
          <button className="home-pg-btn" type="button">
            Go To Home Page
          </button>
        </Link>
      </div>
      <Footer />
    </>
  )

  renderCartView = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const {totalItemsCost} = this.state
    if (cartList === null || cartList.length === 0) {
      return (
        <>
          <Header
            isHome={false}
            isCart
            cartLength={cartList === null ? 0 : cartList.length}
          />
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
          <Footer />
        </>
      )
    }
    return (
      <div className="cart-view-cont">
        <Header isHome={false} isCart cartLength={cartList.length} />
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
          <hr className="cart-line" />
          <li className="cart-summary">
            <h1>Order Total:</h1>
            <p testid="total-price">₹ {totalItemsCost}.00</p>
          </li>
          <li className="order-btn">
            <button
              type="button"
              className="place-odr"
              onClick={this.onClickPlaceOrder}
            >
              Place Order
            </button>
          </li>
        </ul>
        <Footer />
      </div>
    )
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <>
        {isOrderPlaced
          ? this.renderPaymentSuccessView()
          : this.renderCartView()}
      </>
    )
  }
}
export default Cart
