import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: []}

  addCartItem = food => {
    this.setState(prevState => ({cartList: [...prevState.cartList, food]}))
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
