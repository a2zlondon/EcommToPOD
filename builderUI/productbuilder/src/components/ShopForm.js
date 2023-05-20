/* eslint-disable react/prop-types */
const ShopForm = ({ onSubmitClick, newShopID, shopIDChange }) => {
  return (
    <form onSubmit={onSubmitClick}>
      <div>
        Shop ID: <input value={newShopID} onChange={shopIDChange} />
      </div>
      <div>
        <button type="submit">Get Products</button>
      </div>
    </form>
  )
}

export default ShopForm