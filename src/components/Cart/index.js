import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
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
          <div className="cart-items-cont">
            <ul className="cart-items-list">
              <li className="column-heads">
                <p>Item</p>
                <p>Quantity</p>
                <p>Price</p>
              </li>
              {cartList.map(eachItem => (
                <CartItem key={eachItem.id} eachItem={eachItem} />
              ))}
            </ul>
          </div>{' '}
          <Footer />
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
