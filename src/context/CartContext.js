import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
})

export default CartContext
