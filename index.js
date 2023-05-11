var express = require('express');
var app = express();

const {
  v1: uuidv1,
  v4: uuidv4,
  v5: uuidv5,
} = require('uuid');
const axios = require('axios');
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

morgan.token('req-body', function (req) {
  const body = JSON.stringify(req.body)
  return body
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.post('/api/sendtoprintify/:id', (request, response, next) => {
  const body = request.body
  //console.log(`RX ${JSON.stringify(body)} forwarding to printify`)

  //we can have many skus per order. Can fix after we spike POC
  body.order.line_items.map(item => {
    const id = uuidv4()
    var labelid = 0
    console.log(`item.sku ${item.sku} and id ${id}`)
    
    const printifyBodyObject = `{
      "external_id": "${id}",
      "label": "${labelid++}",
        "line_items": [
          {
            "product_id": "${item.product_id}",
            "variant_id": "${item.variant_id}",
            "quantity": "${item.quantity}"
          }
        ],
      "shipping_method": 1,
      "send_shipping_notification": false,
      "address_to": {
      "first_name": "${body.order.customer.first_name}",
      "last_name": "${body.order.customer.last_name}",
      "email": "${body.order.email}",
      "phone": "${body.order.shipping_address.phone}",
      "country": "${body.order.shipping_address.country}",
      "region": "",
      "address1": "${body.order.shipping_address.address1}",
      "address2": "${body.order.shipping_address.address2}",
      "city": "${body.order.shipping_address.city}",
      "zip": "${body.order.shipping_address.zip}"
    }
  }`

    console.log(`shop id ${request.params.id}`)
    console.log(`${printifyBodyObject}`)

    axios.defaults.headers.post['User-Agent'] = 'NodeJS'
    axios.defaults.headers.post['Authorization'] = `Bearer ${process.env.PRINTIFY_TOKEN}`;
    axios
      .post(`https://api.printify.com/v1/shops/${request.params.id}/orders.json`, printifyBodyObject)
      .then(response => {
        console.log(response)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      })
  })
  response.json('done')
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})