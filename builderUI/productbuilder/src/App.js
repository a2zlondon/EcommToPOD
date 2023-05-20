import { useState } from 'react'
//import { useEffect } from 'react'
import ShopForm from './components/ShopForm'
import Products from './components/Products'
import Upload from './components/Upload'
import productService from './services/products'
import Notification from './components/Notification'

const App = () => {

  const [products, setProducts] = useState([])
  const [newShopID, setNewShopID] = useState('9144804')
  const [message, setMessage] = useState({ severity: '', info: '' })

  
  // useEffect(() => {
  //   productService
  //     .getAll()
  //     .then(initialPersons => {
  //       setPersons(initialPersons)
  //     })
  // }, [])

  const getProducts = (event) => {
    event.preventDefault()
    // const nameObject = {
    //   name: newName,
    //   number: newNumber,
    //   id: p.id,
    // }
    console.log('Get Products...')
    productService
      .getAll(newShopID)
      .then(printifyProducts => {
        setProducts(printifyProducts)
      }).catch((error) => {
        showErrorMessage(setMessage, error)
      })
    setMessage({
      severity: 'success',
      info: `Updated: ${newShopID}`
    })
    setTimeout(() => {
      setMessage({ severity: '', info: '' })
    }, 3000)
  }

  const handleShopIDChange = (event) => {
    console.log(event.target.value)
    setNewShopID(event.target.value)
  }

  return (
    <div>
      <h2>Ecommerce to POD Tool</h2>
      <Notification message={message} />

      <h2>Get all products for shopID</h2>
      
      <ShopForm onSubmitClick={getProducts} newShopID={newShopID} shopIDChange={handleShopIDChange} />

      <h2>Products</h2>

      <Products products={products} />

      <h2>CSV</h2>

      <Upload products={products} />

    </div>
  )
}

function showErrorMessage(setMessage, error) {
  setMessage({
    severity: 'error',
    info: error.response.data.error
  })
  setTimeout(() => {
    setMessage({ severity: '', info: '' })
  }, 3000)
}

export default App
