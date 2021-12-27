import faker from 'faker'
import { sample } from 'lodash'
const promotions = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  description: faker.commerce.productDescription(),
  timeStart: faker.date.past(),
  timeEnd: faker.date.future(),
  type: sample([
    'Discounted products',
    'Free Shipping',
    'Flash Sale',
    'Coupon Giveaway',
    'BOGO',
  ]),
  numOfUses: faker.datatype.number(20),
}))

export default promotions
