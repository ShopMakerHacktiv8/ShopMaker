const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { Shop, Product, Category } = require('../models')

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

let product = {};

afterAll(async (done) => {
  if (process.env.NODE_ENV !== "test") return;
  try {
    await Shop.destroy({ truncate: true, cascade: true });
    await Product.destroy({ truncate: true, cascade: true });
    await Category.destroy({ truncate: true, cascade: true });
    done();
  } catch (err) {
    done(err);
  }
});


let access_token
let shop_id
let access_token_not_authorized
let category_id
let category

beforeAll(async (done) => {
  if (process.env.NODE_ENV !== "test") return;
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

    category = await Category.create({
      shop_id,
      name: 'ikan hias'
    })

    category_id = category.id

    product = await Product.create({
      shop_id,
      category_id: category_id,
      name: "Iphone 11",
      image_url:
        "https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-14..1588802180.jpg",
      price: 100000,
      stock: 5,
      description: 'A13 Bionic is powerfull'
    });

    done();
  } catch (err) {
    done(err);
  }
});

describe('Create -- Success Case', () => {
  test('send correct token and input', (done) => {
    let category_data = {
      name: "Electronic"
    }
    request(app)
      .post('/categories')
      .set('access_token', access_token)
      .send(category_data)
      .end(function (err, res) {
        if (err) throw err
        else {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty('id', expect.any(Number))
          expect(res.body).toHaveProperty('shop_id', shop_id)
          expect(res.body).toHaveProperty('name', category_data.name)
          done()
        }
      })
  })
})

describe('Create -- Error Case', () => {
  test('token not inserted', (done) => {
    let category_data = {
      name: "Electronic"
    }
    request(app)
      .post('/categories')
      .send(category_data)
      .end(function (err, res) {
        const errors = ['authentication failed']
        if (err) throw err
        else {
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toEqual(errors)
          done()
        }
      })
  })

  test('empty input submitted', (done) => {
    request(app)
      .post('/categories')
      .set('access_token', access_token)
      .send({
        name: null,
        shop_id: 1
      })
      .end(function (err, res) {
        const errors = ['name is required']
        if (err) throw err
        else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toEqual(errors)
          done()
        }
      })
  })

})


describe('Read -- Success Case', () => {
  test('send correct token', (done) => {
    request(app)
      .get(`/categories?shop_id=${shop_id}`)
      .end(function (err, res) {
        if (err) throw err
        else {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(expect.any(Array))
          done()
        }
      })
  })
})


describe("Delete Category / Error Case", () => {
  test("Failed because of access_token not provided", (done) => {
    request(app)
      .delete(`/categories/${category.id}`)
      .end((err, res) => {
        if (err) throw err;
        const errors = ["authentication failed"];
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(errors);
        done();
      });
  });
});

describe("Delete Category / Error Case", () => {
  test("Failed because of category not found", (done) => {
    request(app)
      .delete(`/categories/${category.id + 99}`)
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) throw err;
        const errors = ["category not found"];
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(errors);
        done();
      });
  });
});

describe("Delete Category / Success Case", () => {
  test("Should send object with key: message", (done) => {
    request(app)
      .delete(`/categories/${category.id}`)
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "delete category success");
        done();
      });
  });
});
