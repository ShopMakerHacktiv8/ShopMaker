const request = require('supertest')
const app = require('../app')
const { Shop, Product, Category } = require('../models')

let product_data = {
  shop_id: 1,
  category_id: 1,
  name: "Macbook Pro 2020",
  image_url:
    "https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-14..1588802180.jpg",
  price: 2000000,
  stock: 10,
  description: 'Power and performa!'
};

let product = {};

let access_token = "";
let access_token_not_admin = "";

afterAll(async (done) => {
  if (process.env.NODE_ENV !== "test") return;
  try {
    await Shop.destroy({ truncate: true });
    await Product.destroy({ truncate: true });
    await Category.destroy({ truncate: true});
    done();
  } catch (err) {
    done(err);
  }
});

beforeAll(async (done) => {
  if (process.env.NODE_ENV !== "test") return;
  try {
    await Shop.create({
      email: "admin@mail.com",
      password: "1234",
      name: "Admin",
      icon_url: 'https://i.pinimg.com/originals/7c/2f/11/7c2f1106dfa09d02d28e841bb1d1a7c0.jpg',
      address: 'Bandung',
      phone: 888877,
      description: 'Jual beli ikatn cupang'
    });

    // access_token = generateToken({
    //   id: shop.id,
    //   email: shop.email,
    //   // role: shop.role,
    // });

    // const shop2 = await Shop.create({
    //   email: "ramzy@mail.com",
    //   password: "1234",
    //   name: "Master",
    //   icon_url: 'https://i.pinimg.com/originals/7c/2f/11/7c2f1106dfa09d02d28e841bb1d1a7c0.jpg',
    //   address: 'Bandung',
    //   phone: 088888877
    // });

    // access_token_not_admin = generateToken({
    //   id: shop2.id,
    //   email: shop2.email,
    //   // role: shop2.role,
    // });

    await Category.create({
      shop_id: 1,
      name: 'ikan hias'
    })

    product = await Product.create({
      shop_id: 1,
      category_id: 1,
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


// after all


//  before all


describe('Create Product / Success Case', () => {
  test('Should send object with keys: id, shop_id, category_id, name, image_url, price, stock, description', (done) => {
    request(app)
      .post('/products')
      // .set('access_token', initial_token_admin)
      .send(product_data)
      .end((err, res) => {
        if (err) throw err;
        else {
          console.log(res.body, '<<< res body di describe test product')
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('id', expect.any(Number))
          // expect(res.body).toHaveProperty('shop_id', product_data.shop_id)
          // expect(res.body).toHaveProperty('category_id', product_data.category_id)
          expect(res.body).toHaveProperty('name', product_data.name)
          expect(res.body).toHaveProperty('image_url', product_data.image_url)
          expect(res.body).toHaveProperty('price', product_data.price)
          expect(res.body).toHaveProperty('stock', product_data.stock)
          expect(res.body).toHaveProperty('description', product_data.descripton)
          shop_id = res.body.id;
          category_id = res.body.id;
          done()
        }
      })
  })
})

// describe("Create Product / Error Case", () => {
//   test("Failed because of access_token not provided", (done) => {
//     request(app)
//       .post("/products")
//       .send(product_data)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = ["authentication failed"];
//         expect(res.status).toBe(401);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });

//   test("Failed because of access_token does not belong to admin", (done) => {
//     request(app)
//       .post("/products")
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

//   test("Failed because of required fields not provided", (done) => {
//     request(app)
//       .post("/products")
//       .set("access_token", access_token)
//       .send({})
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = [
//           "name is required",
//           "image_url is required",
//           "price is required",
//           "stock is required",
//           "description is required"
//         ];
//         expect(res.status).toBe(400);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });

//   // test("Failed because of stock field is not a positive integer", (done) => {
//   //   const product_data_with_negative_stock = {
//   //     ...product_data,
//   //     stock: -2,
//   //   };
//   //   request(app)
//   //     .post("/products")
//   //     .set("access_token", access_token)
//   //     .send(product_data_with_negative_stock)
//   //     .end((err, res) => {
//   //       if (err) throw err;
//   //       const errors = ["stock must be a positive integer"];
//   //       expect(res.status).toBe(400);
//   //       expect(res.body).toHaveProperty("errors", expect.any(Array));
//   //       expect(res.body.errors).toEqual(errors);
//   //       done();
//   //     });
//   // });

//   // test("Failed because of price field is not a positive integer", (done) => {
//   //   const product_data_with_negative_price = {
//   //     ...product_data,
//   //     price: -2,
//   //   };
//   //   request(app)
//   //     .post("/products")
//   //     .set("access_token", access_token)
//   //     .send(product_data_with_negative_price)
//   //     .end((err, res) => {
//   //       if (err) throw err;
//   //       const errors = ["stock must be a positive integer"];
//   //       expect(res.status).toBe(400);
//   //       expect(res.body).toHaveProperty("errors", expect.any(Array));
//   //       expect(res.body.errors).toEqual(errors);
//   //       done();
//   //     });
//   // });

//   // test("Failed because of field data are invalid data types", (done) => {
//   //   const product_data_with_invalid_data_types = {
//   //     ...product_data,
//   //     stock: "2a",
//   //     price: "1000a",
//   //   };
//   //   request(app)
//   //     .post("/products")
//   //     .set("access_token", access_token)
//   //     .send(product_data_with_invalid_data_types)
//   //     .end((err, res) => {
//   //       if (err) throw err;
//   //       const errors = [
//   //         "price must be a positive integer",
//   //         "stock must be a positive integer",
//   //       ];
//   //       expect(res.status).toBe(400);
//   //       expect(res.body).toHaveProperty("errors", expect.any(Array));
//   //       expect(res.body.errors).toEqual(errors);
//   //       done();
//   //     });
//   // });

// })

// describe("Update Product / Success Case", () => {
//   test("Should send object with keys: id, name, image_url, price, stock", (done) => {
//     request(app)
//       .put(`/products/${product.id}`)
//       .set("access_token", access_token)
//       .send(product_data)
//       .end((err, res) => {
//         if (err) throw err;
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty("id", product.id);
//         expect(res.body).toHaveProperty("name", product_data.name);
//         expect(res.body).toHaveProperty("image_url", product_data.image_url);
//         expect(res.body).toHaveProperty("price", product_data.price);
//         expect(res.body).toHaveProperty("stock", product_data.stock);
//         expect(res.body).toHaveProperty("description", product_data.description);
//         done();
//       });
//   });
// });

// describe("Update Product / Error Case", () => {
//   test("Failed because of access_token not provided", (done) => {
//     request(app)
//       .put(`/products/${product.id}`)
//       .send(product_data)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = ["authentication failed"];
//         expect(res.status).toBe(401);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });

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

//   test("Failed because of stock field is not a positive integer", (done) => {
//     const product_data_with_negative_stock = {
//       ...product_data,
//       stock: -2,
//     };
//     request(app)
//       .put(`/products/${product.id}`)
//       .set("access_token", access_token)
//       .send(product_data_with_negative_stock)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = ["stock must be a positive integer"];
//         expect(res.status).toBe(400);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });

//   test("Failed because of price field is not a positive integer", (done) => {
//     const product_data_with_negative_price = {
//       ...product_data,
//       price: -2,
//     };
//     request(app)
//       .put(`/products/${product.id}`)
//       .set("access_token", access_token)
//       .send(product_data_with_negative_price)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = ["price must be a positive integer"];
//         expect(res.status).toBe(400);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });

//   test("Failed because of field data are invalid data types", (done) => {
//     const product_data_with_invalid_data_types = {
//       ...product_data,
//       stock: "2a",
//       price: "1000a",
//     };
//     request(app)
//       .put(`/products/${product.id}`)
//       .set("access_token", access_token)
//       .send(product_data_with_invalid_data_types)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = [
//           "price must be a positive integer",
//           "stock must be a positive integer",
//         ];
//         expect(res.status).toBe(400);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });
// })

// describe("Read Products / Success Case", () => {
//   test("Should send array", (done) => {
//     request(app)
//       .get("/products")
//       .set("access_token", access_token)
//       .end((err, res) => {
//         if (err) throw err;
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual(expect.any(Array));
//         done();
//       });
//   });
// });

// describe("Read Product By Id / Success Case", () => {
//   test("Should send object with keys: id, name, image_url, price, stock", (done) => {
//     request(app)
//       .get(`/products/${product.id}`)
//       .set("access_token", access_token)
//       .end((err, res) => {
//         if (err) throw err;
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty("id", product.id);
//         expect(res.body).toHaveProperty("name", product_data.name);
//         expect(res.body).toHaveProperty("image_url", product_data.image_url);
//         expect(res.body).toHaveProperty("price", product_data.price);
//         expect(res.body).toHaveProperty("stock", product_data.stock);
//         expect(res.body).toHaveProperty("description", product_data.description)
//         done();
//       });
//   })
// })

// describe("Read Product By Id / Error Case", () => {
//   test("Failed because of access_token not provided", (done) => {
//     request(app)
//       .get(`/products/${product.id}`)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = ["authentication failed"];
//         expect(res.status).toBe(401);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });
// });

// describe("Delete Product / Success Case", () => {
//   test("Should send object with key: message", (done) => {
//     request(app)
//       .delete(`/products/${product.id}`)
//       .set("access_token", access_token)
//       .end((err, res) => {
//         if (err) throw err;
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty("message", "delete product success");
//         done();
//       });
//   });
// });

// describe("Delete Product / Error Case", () => {
//   test("Failed because of access_token not provided", (done) => {
//     request(app)
//       .delete(`/products/${product.id}`)
//       .end((err, res) => {
//         if (err) throw err;
//         const errors = ["authentication failed"];
//         expect(res.status).toBe(401);
//         expect(res.body).toHaveProperty("errors", expect.any(Array));
//         expect(res.body.errors).toEqual(errors);
//         done();
//       });
//   });

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

