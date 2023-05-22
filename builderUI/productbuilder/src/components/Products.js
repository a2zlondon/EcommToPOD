
const Products = ({ products }) => {
  return (
    <textarea name="products" value={JSON.stringify(products, null, 2)} />
  )
}

export default Products
