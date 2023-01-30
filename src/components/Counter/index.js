/* eslint-disable react/no-unknown-property */
import './index.css'

const Counter = props => {
  const {quantity, onClickPlus, onClickMinus} = props
  const plusClicked = () => {
    onClickPlus()
  }
  const minusClicked = () => {
    onClickMinus()
  }
  return (
    <div className="counter-cont">
      <button type="button" testid="decrement-count" onClick={minusClicked}>
        -
      </button>
      <p testid="active-count">{quantity}</p>
      <button type="button" testid="increment-count" onClick={plusClicked}>
        +
      </button>
    </div>
  )
}

export default Counter
