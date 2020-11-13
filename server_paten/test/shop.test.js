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

let shop_data2 = {
  email: 'tesuto@gmail.com',
  password: '12345',
  name: 'Toko Test23',
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

    const shop2 = await Shop.create(shop_data2)
    access_token_not_authorized = generateToken({
      id: shop2.id,
      email: shop2.email,
      name: shop2.name,
    })
    done()
  } catch (err) {
    done(err)
  }
})

describe('Login / Success Case', () => {
  test('Should send an object with keys: access_token, id, email, name', (done) => {
    request(app)
      .post('/shops/login')
      .send({ email: shop_data.email, password: shop_data.password })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('access_token', expect.any(String))
        expect(res.body).toHaveProperty('id', expect.any(Number))
        expect(res.body).toHaveProperty('email', shop_data.email)
        expect(res.body).toHaveProperty('name', shop_data.name)
        done()
      })
  })
})

describe('Login / Error Case', () => {
  test('Failed because of wrong password', (done) => {
    const shop_wrong_password = {
      ...shop_data,
      password: 'test123',
    }

    request(app)
      .post('/shops/login')
      .send(shop_wrong_password)
      .end((err, res) => {
        if (err) throw err
        const errors = ['invalid email or password']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of email not found', (done) => {
    const shop_email_not_found = {
      ...shop_data,
      email: 'test12@gmail.com',
    }

    request(app)
      .post('/shops/login')
      .send(shop_email_not_found)
      .end((err, res) => {
        if (err) throw err
        const errors = ['invalid email or password']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of email and password not provided', (done) => {
    const shop_email_and_password_not_provided = {}

    request(app)
      .post('/shops/login')
      .send(shop_email_and_password_not_provided)
      .end((err, res) => {
        if (err) throw err
        const errors = ['invalid email or password']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })
})

// --------------------------------------------------------------------

describe('Register / Success Case', () => {
  test('Should send an object with keys: id, email, name', (done) => {
    const shop_register_data = {
      email: 'dora@gmail.com',
      password: 'dora123',
      name: 'Toko Dora',
      address: 'Jalan Dora@gmail.com',
      phone: '08888123',
      description: 'Ini Bukan Toko Biasa',
    }
    request(app)
      .post('/shops/register')
      .set('Content-type', 'multipart/form-data')
      .field('email', shop_register_data.email)
      .field('password', shop_register_data.password)
      .field('name', shop_register_data.name)
      .field('address', shop_register_data.address)
      .field('phone', shop_register_data.phone)
      .field('description', shop_register_data.description)
      .attach('file', `${__dirname}/assets/home.png`)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id', expect.any(Number))
        expect(res.body).toHaveProperty('email', shop_register_data.email)
        expect(res.body).toHaveProperty('name', shop_register_data.name)
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })
})

describe('Register / Error Case', () => {
  test('Failed because of email is already in use', (done) => {
    const shop_register_data = {
      email: 'test@gmail.com',
      password: 'dora123',
      name: 'Toko Dora',
      address: 'Jalan Dora@gmail.com',
      phone: '08888123',
      description: 'Ini Bukan Toko Biasa',
    }
    request(app)
      .post('/shops/register')
      .set('Content-type', 'multipart/form-data')
      .field('email', shop_register_data.email)
      .field('password', shop_register_data.password)
      .field('name', shop_register_data.name)
      .field('address', shop_register_data.address)
      .field('phone', shop_register_data.phone)
      .field('description', shop_register_data.description)
      .attach('file', `${__dirname}/assets/home.png`)
      .then((res) => {
        const errors = ['email is already in use']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  test('Failed because of field is not provided', (done) => {
    const shop_register_data = {
      email: 'test@gmail.com',
      password: 'dora123',
      name: 'Toko Dora',
      address: 'Jalan Dora@gmail.com',
      phone: '08888123',
      description: 'Ini Bukan Toko Biasa',
    }
    request(app)
      .post('/shops/register')
      .set('Content-type', 'multipart/form-data')
      .attach('file', `${__dirname}/assets/home.png`)
      .then((res) => {
        const errors = [
          'email is required',
          'password is required',
          'name is required',
          'address is required',
          'phone is required',
          'description is required',
        ]
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })
})

describe('Read Shop By Id / Success Case', () => {
  test('Should send an object with keys:  id, email, name, address, phone, description, icon_url', (done) => {
    request(app)
      .get(`/shops/${shop_id}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id', expect.any(Number))
        expect(res.body).toHaveProperty('email', shop_data.email)
        expect(res.body).toHaveProperty('name', shop_data.name)
        expect(res.body).toHaveProperty('address', shop_data.address)
        expect(res.body).toHaveProperty('phone', shop_data.phone)
        expect(res.body).toHaveProperty('description', shop_data.description)
        expect(res.body).toHaveProperty('icon_url', expect.any(String))
        done()
      })
  })
})

describe('Read Shop By Id / Failed Case', () => {
  test('Failed because of shop not found', (done) => {
    request(app)
      .get(`/shops/${shop_id + 99}`)
      .set('access_token', access_token)
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
