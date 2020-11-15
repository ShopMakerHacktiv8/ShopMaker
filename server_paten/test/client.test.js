const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { Shop } = require('../models')

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

afterAll(async (done) => {
  if (process.env.NODE_ENV !== 'test') return
  try {
    await Shop.destroy({ truncate: true, cascade: true })
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
    const shop = await Shop.create(shop_data)
    access_token = generateToken({
      id: shop.id,
      email: shop.email,
      name: shop.name,
    })
    shop_id = shop.id
    done()
  } catch (err) {
    done(err)
  }
})

describe('Read Manifest By Id / Success Case', () => {
  test('Should send an object with keys:  id, email, name, address, phone, description, icon_url', (done) => {
    request(app)
      .get(`/clients/${shop_id}`)
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('short_name', expect.any(String))
        expect(res.body).toHaveProperty('name', shop_data.name)
        done()
      })
  })
})

describe('Read Manifest By Id / Failed Case', () => {
  test('Failed because of shop not found', (done) => {
    request(app)
      .get(`/shops/${shop_id + 99}`)
      .end((err, res) => {
        if (err) throw err
        const errors = ['shop not found']
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
        done()
      })
  })
})
