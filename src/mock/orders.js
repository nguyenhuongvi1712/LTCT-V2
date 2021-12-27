import faker from 'faker'
import { sample } from 'lodash'

const product_list = [
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 195123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 126123,
      quantity: 5,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 126123,
      quantity: 1,
    },
    {
      product_id: 127123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 1,
    },
    {
      product_id: 127123,
      quantity: 5,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 128123,
      quantity: 4,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 129123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 129123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 129123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 129123,
      quantity: 3,
    },
    {
      product_id: 173123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 173123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 163123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 154123,
      quantity: 3,
    },
    {
      product_id: 163123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 154123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 195123,
      quantity: 3,
    },
  ],
  [
    {
      product_id: 124123,
      quantity: 3,
    },
    {
      product_id: 125123,
      quantity: 2,
    },
    {
      product_id: 195123,
      quantity: 3,
    },
  ],
]

const orders = [...Array(24)].map((_, index) => ({
  order_id: faker.datatype.uuid(),
  user_id: faker.datatype.uuid,
  note: faker.commerce.productDescription(),
  status: sample(['active', 'done']),
  order_timestamp: new Date(faker.date.past()),
  deliver_timestamp: faker.date.future(),
  cancel_timestamp: faker.date.future(),
  product_list: product_list[index],
  total: faker.datatype.number(1000000000),
}))

export default orders
