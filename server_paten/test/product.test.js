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
    await Category.destroy({ truncate: true, cascade: true});
    done();
  } catch (err) {
    done(err);
  }
});


let access_token
let shop_id
let access_token_not_authorized
let category_id


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

    const category = await Category.create({
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


describe('Create Product / Success Case', () => {
  test('Should send object with keys: id, shop_id, category_id, name, image_url, price, stock, description', (done) => {
    const create_product_data = {
      shop_id,
      category_id,
      name: "Iphone 11",
      image_url:
        "https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-14..1588802180.jpg",
      price: 100000,
      stock: 5,
      description: 'A13 Bionic is powerfull'
    }    
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .field('name', create_product_data.name)
      .field('price', create_product_data.price)
      .field('stock', create_product_data.stock)
      .field('description', create_product_data.description)
      .field('category_id', create_product_data.category_id)
      .attach('file', `${__dirname}/assets/home.png`)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id', expect.any(Number))
        expect(res.body).toHaveProperty('shop_id', create_product_data.shop_id)
        expect(res.body).toHaveProperty('category_id', create_product_data.category_id)
        expect(res.body).toHaveProperty('name', create_product_data.name)
        expect(res.body).toHaveProperty('image_url', expect.any(String))
        expect(res.body).toHaveProperty('price', create_product_data.price)
        expect(res.body).toHaveProperty('stock', create_product_data.stock)
        expect(res.body).toHaveProperty('description', create_product_data.description)
        
        done()
      
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
})


describe("Create Product / Error Case", () => {
  test("Failed because of access_token not provided", (done) => {
    const create_product_data = {
      shop_id,
      category_id,
      name: "Iphone 11",
      image_url:
        "https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-14..1588802180.jpg",
      price: 100000,
      stock: 5,
      description: 'A13 Bionic is powerfull'
    }

    request(app)
      .post("/products")
      .field('name', create_product_data.name)
      .field('price', create_product_data.price)
      .field('stock', create_product_data.stock)
      .field('description', create_product_data.description)
      .field('category_id', create_product_data.category_id)
      .then(res => {
        const errors = ["authentication failed"];
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(errors);
        done();
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  });

  test("Failed because of required fields not provided", (done) => {
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .attach('file', `${__dirname}/assets/home.png`)
      .then(res => {
        const errors = [
          "name is required",
          "price is required",
          "stock is required",
          "description is required",
        ];
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(errors);
        done();
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  });

})

describe("Read Products / Success Case", () => {
  test("Should send array", (done) => {
    request(app)
      .get(`/products?shop_id=${shop_id}`)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Array));
        done();
      });
  });
});
  
describe("Read Product By Id / Success Case", () => {
  test("Should send object with keys: id, name, image_url, price, stock, description", (done) => {
    request(app)
      .get(`/products/${product.id}`)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("id", product.id);
        expect(res.body).toHaveProperty("name", product.name);
        expect(res.body).toHaveProperty("image_url", expect.any(String));
        expect(res.body).toHaveProperty("price", product.price);
        expect(res.body).toHaveProperty("stock", product.stock);
        expect(res.body).toHaveProperty("description", product.description)
        done();
      });
  })
})

describe("Read Product By Id / Error Case", () => {
  test("failed because of product not found", (done) => {
    request(app)
      .get(`/products/${product.id + 999}`)
      .then( res => {
        const errors = ["product not found"];
        expect(res.status).toBe(404);
        expect(res.body.errors).toEqual(errors);
        done();
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
})


describe("Update Product / Success Case", () => {
  test("Should send object with keys: id, name, image_url, price, stock", (done) => {
    const create_product_data = {
      shop_id,
      category_id,
      name: "Iphone 11",
      image_url:
        "https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-14..1588802180.jpg",
      price: 100000,
      stock: 5,
      description: 'A13 Bionic is powerfull'
    }
    request(app)
      .put(`/products/${product.id}`)
      .set('access_token', access_token)
      .field('name', create_product_data.name)
      .field('price', create_product_data.price)
      .field('stock', create_product_data.stock)
      .field('description', create_product_data.description)
      .field('category_id', create_product_data.category_id)
      .attach('file', `${__dirname}/assets/home.png`)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("id", product.id);
        expect(res.body).toHaveProperty("name", create_product_data.name);
        expect(res.body).toHaveProperty("image_url", expect.any(String));
        expect(res.body).toHaveProperty("price", create_product_data.price);
        expect(res.body).toHaveProperty("stock", create_product_data.stock);
        expect(res.body).toHaveProperty("description", create_product_data.description);
        done();
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  });
});

describe("Update Product / Error Case", () => {
  test("Failed because of access_token not provided", (done) => {
    const create_product_data = {
      shop_id,
      category_id,
      name: "Iphone 11",
      image_url:
        "https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-14..1588802180.jpg",
      price: 100000,
      stock: 5,
      description: 'A13 Bionic is powerfull'
    }
    request(app)
      .put(`/products/${product.id}`)
      .field('name', create_product_data.name)
      .field('price', create_product_data.price)
      .field('stock', create_product_data.stock)
      .field('description', create_product_data.description)
      .field('category_id', create_product_data.category_id)
      .then( res => {
        console.log(res.body, '<=== res body guis')
        const errors = ["authentication failed"];
        expect(res.status).toBe(401);
        expect(res.body.errors).toEqual(errors);
        done();
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  });

  test("Failed because of product not found", (done) => {
    request(app)
      .put(`/products/${product.id + 999}`)
      .set("access_token", access_token)
      .then( res => {
        const errors = ["product not found"];
        expect(res.status).toBe(404);
        expect(res.body.errors).toEqual(errors);
        done();
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  });
})

//   test("Failed because of access_token does not belong to admin", (done) => {
//     request(app)
//       .put(`/products/${product.id}`)
//       .set("access_token", access_token_not_admin)
//       .send(product_data)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = ["authorization failed"];
//         expect(res.status).toBe(403);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });

describe("Delete Product / Error Case", () => {
  test("Failed because of access_token not provided", (done) => {
    request(app)
      .delete(`/products/${product.id}`)
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

describe("Delete Product / Error Case", () => {
  test("Failed because of product not found", (done) => {
    request(app)
      .delete(`/products/${product.id + 99}`)
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) throw err;
        const errors = ["product not found"];
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(errors);
        done();
      });
  });
});

describe("Delete Product / Success Case", () => {
  test("Should send object with key: message", (done) => {
    request(app)
      .delete(`/products/${product.id}`)
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "delete product success");
        done();
      });
  });
});

//   test("Failed because of access_token does not belong to admin", (done) => {
//     request(app)
//       .delete(`/products/${product.id}`)
//       .set("access_token", access_token_not_admin)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = ["authorization failed"];
//         expect(res.status).toBe(403);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });
// });

