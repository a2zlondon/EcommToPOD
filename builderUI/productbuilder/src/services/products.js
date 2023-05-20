import axios from 'axios'
const baseUrl = '/api/products'
//const baseUrl = 'http://localhost:3000/api/products'

const getAll = (id) => {
  console.log(`ID = = =${id}`)
  const request = axios.get(`${baseUrl}/${id}`)
  console.log(`RTEQUEST = = =${request}`)
  return request.then(response => response.data)
}

const productService = { getAll }
export default productService
