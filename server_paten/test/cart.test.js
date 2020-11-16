/**
 * @jest-environment node
 */

const request = require('supertest')
const app = require('../app')
const CartController = require('../controllers/cartController')
const { generateToken } = require('../helpers/jwt')
const { Shop, Product, Cart } = require('../models')

let shop_data = {
  email: 'test@gmail.com',
  password: '1234',
  name: 'Toko Test',
  icon_url:
    'https://shopmaker-hacktiv8.s3.ap-southeast-1.amazonaws.com/1605251232387-Simulator%20Screen%20Shot%20-%20iPhone%20SE%20%282nd%20generation%29%20-%202020-11-04%20at%2000.12.23.png',
  address: 'Jalan test no.18, Bandung',
  phone: '0812345678',
  description: 'Ini toko nyoba',
}

console.log(shop_data)

let product = {}
let cart = {}

afterAll(async (done) => {
  if (process.env.NODE_ENV !== 'test') return
  try {
    await Shop.destroy({ truncate: true, cascade: true })
    await Product.destroy({ truncate: true, cascade: true })
    done()
  } catch (err) {
    done(err)
  }
})

let access_token
let shop_id
let access_token_not_authorized

beforeAll(async (done) => {
  if (process.env.NODE_ENV !== 'test') return
  try {
    console.log('SDFSDFSFDFASFDSS')
    const shop = await Shop.create(shop_data)
    access_token = generateToken({
      id: shop.id,
      email: shop.email,
      name: shop.name,
    })
    shop_id = shop.id

    product = await Product.create({
      shop_id,
      name: 'Iphone 11',
      image_url:
        'https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-14..1588802180.jpg',
      price: 100000,
      stock: 5,
      description: 'A13 Bionic is powerfull',
    })

    cart = await Cart.create({
      product_id: product.id,
      quantity: 3,
      status: false,
      user_name: 'mamang gtg',
      user_address: 'kopong',
      user_phone: '082666',
      shop_id: shop_id,
    })
    done()
  } catch (err) {
    done(err)
  }
})


describe('Get Carts / Success Case', () => {
  test('Should send an object with keys: token', (done) => {
    request(app)
      .get(`/shops/${shop_id}/carts`)
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        // expect(res.body).toHaveProperty('token', expect.any(String))
        // expect(res.body).toBe(expect.any(Array))
        done()
      })
  })
})

// describe('Buy Product / Failed Case', () => {
//   test('Failed because of product not found', (done) => {
//     request(app)
//       .post(`/clients/${shop_id}/buy`)
//       .send({
//         name: 'Ramzy',
//         phone: '08112108544',
//         address: 'Jalan Batu Indah VII No.18',
//         total: 500000,
//         product_id: product.id + 99,
//         quantity: 5,
//       })
//       .end((err, res) => {
//         if (err) throw err
//         const errors = ['product not found']
//         expect(res.status).toBe(404)
//         expect(res.body).toHaveProperty('errors', expect.any(Array))
//         expect(res.body.errors).toEqual(errors)
//         done()
//       })
//   })

//   test('Failed because of stock not available', (done) => {
//     request(app)
//       .post(`/clients/${shop_id}/buy`)
//       .send({
//         name: 'Ramzy',
//         phone: '08112108544',
//         address: 'Jalan Batu Indah VII No.18',
//         total: 500000,
//         product_id: product.id,
//         quantity: 100,
//       })
//       .end((err, res) => {
//         if (err) throw err
//         const errors = ['stock not available']
//         expect(res.status).toBe(400)
//         expect(res.body).toHaveProperty('errors', expect.any(Array))
//         expect(res.body.errors).toEqual(errors)
//         done()
//       })
//   })
// })
