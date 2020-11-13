const request = require('supertest')
const app = require('../app')
const { Category, Shop } = require('../models')
const jwt = require('jsonwebtoken')

let dummy = {
    shop_id: 1,
    name: "spg"
}

let dummy2 = {
    shop_id: 1,
    name: "spg bohay"
}

let user = {
    email: "bagas@email.com",
    password: "bagas123"
}

beforeAll(function (done) {
    Category.create(dummy2)
        .then(data => {
            id = data.id
            // token = jwt.sign(param, process.env.SECRET)
            done()
        })
        .catch(err => {
            done(err)
        })
});


// beforeAll(function (done) {
//     Shop.findOne({
//         where: {
//             email: user.email
//         }
//     })
//         .then(data => {
//             let param = {
//                 email: data.email
//             }
//             // token = jwt.sign(param, process.env.SECRET)
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
// });


// afterAll(function (done) {
//     Category.destroy({ truncate: true })
//         .then(_ => {
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
// });

describe('Create -- Success Case', () => {
    test('send correct token and input', (done) => {
        request(app)
            .post('/category')
            // .set('token', token)
            .send(dummy)
            .end(function (err, res) {
                if (err) throw err
                else {
                    expect(res.status).toBe(201);
                    expect(res.body).toHaveProperty('id', expect.any(Number))
                    expect(res.body).toHaveProperty('shop_id', expect.any(Number))
                    expect(res.body).toHaveProperty('name', expect.any(String))
                    done()
                }
            })
    })
})

// describe('Create -- Error Case', () => {
//     test('token not inserted', (done) => {
//         request(app)
//             .post('/category')
//             .set('token', null)
//             .send(dummy)
//             .end(function (err, res) {
//                 const errors = ['Unauthorization account!']
//                 if (err) throw err
//                 else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('err', expect.any(Array))
//                     expect(res.body.err).toEqual(errors)
//                     done()
//                 }
//             })
//     }),
//         test('wrong token inserted', (done) => {
//             request(app)
//                 .post('/category')
//                 .set('token', 'this is wrong token')
//                 .send(dummy)
//                 .end(function (err, res) {
//                     const errors = ['Unauthorization account!']
//                     if (err) throw err
//                     else {
//                         expect(res.status).toBe(401)
//                         expect(res.body).toHaveProperty('err', expect.any(Array))
//                         expect(res.body.err).toEqual(errors)
//                         done()
//                     }
//                 })
//         }),

        test('empty input submitted', (done) => {
            request(app)
                .post('/category')
                // .set('token', token)
                .send({
                    name: null,
                    shop_id : 1
                })
                .end(function (err, res) {
                    const errors = ['Category.name cannot be null']
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        //expect(res.body.errors).toHaveProperty([], expect.any(Array))
                        expect(res.body.errors).toEqual(errors)
                        done()
                    }
                })
        })

//         test('Wrong type of input sumbitted', (done) => {
//             request(app)
//                 .post('/category')
//                 .set('token', token)
//                 .send({
//                     name: "jaket",
//                     image_url: "www.google.com",
//                     price: "dua puluh ribu",
//                     stock: 1
//                 })
//                 .end(function (err, res) {
//                     const errors = ['please input number format!']
//                     if (err) throw err
//                     else {
//                         expect(res.status).toBe(400)
//                         expect(res.body).toHaveProperty('err', expect.any(Array))
//                         expect(res.body.err).toEqual(errors)
//                         done()
//                     }
//                 })
//         })
// })

describe('Read -- Success Case', () => {
    test('send correct token', (done) => {
        request(app)
            .get('/category')
            // .set('token', token)
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

// describe('Read -- Error Case', () => {
//     test('token not inserted', (done) => {
//         request(app)
//             .get('/category')
//             .set('token', null)
//             .end(function (err, res) {
//                 const errors = ['Unauthorization account!']
//                 if (err) throw err
//                 else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('err', expect.any(Array))
//                     expect(res.body.err).toEqual(errors)
//                     done()
//                 }
//             })
//     }),
//         test('token inserted, but not admin', (done) => {
//             request(app)
//                 .get('/category')
//                 .set('token', tokenCust)
//                 .end(function (err, res) {
//                     const errors = [`you're not admin!`]
//                     if (err) throw err
//                     else {
//                         expect(res.status).toBe(401)
//                         expect(res.body).toHaveProperty('err', expect.any(Array))
//                         expect(res.body.err).toEqual(errors)
//                         done()
//                     }
//                 })
//         })
// })

// describe('Update -- Error Case', () => {
//     test('token not inserted', (done) => {
//         request(app)
//             .put(`/category/${id}`)
//             .set('token', null)
//             .send(dummy2)
//             .end(function (err, res) {
//                 const errors = ['Unauthorization account!']
//                 if (err) throw err
//                 else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('err', expect.any(Array))
//                     expect(res.body.err).toEqual(errors)
//                     done()
//                 }
//             })
//     }),
//         test('wrong token inserted', (done) => {
//             request(app)
//                 .put(`/category/${id}`)
//                 .set('token', 'this is wrong token')
//                 .send(dummy2)
//                 .end(function (err, res) {
//                     const errors = ['Unauthorization account!']
//                     if (err) throw err
//                     else {
//                         expect(res.status).toBe(401)
//                         expect(res.body).toHaveProperty('err', expect.any(Array))
//                         expect(res.body.err).toEqual(errors)
//                         done()
//                     }
//                 })
//         }),
        test('empty input submitted', (done) => {
            request(app)
                .put(`/category/${id}`)
                // .set('token', token)
                .send({
                    name: null
                })
                .end(function (err, res) {
                    const errors = ['Category.name cannot be null']
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        // expect(res.body).toHaveProperty('err', expect.any(Array))
                        expect(res.body.errors).toEqual(errors)
                        done()
                    }
                })
        })

describe('Update -- Success Case', () => {
    test('send correct token and input', (done) => {
        request(app)
            .put(`/category/${id}`)
            // .set('token', token)
            .send(dummy2)
            .end(function (err, res) {
                if (err) throw err
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('name', expect.any(String))
                    done()
                }
            })
    })
})

// describe('Delete -- Error Case', () => {
//     test('token not inserted', (done) => {
//         request(app)
//             .delete(`/category/${id}`)
//             .set('token', null)
//             .end(function (err, res) {
//                 const errors = ['Unauthorization account!']
//                 if (err) throw err
//                 else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('err', expect.any(Array))
//                     expect(res.body.err).toEqual(errors)
//                     done()
//                 }
//             })
//     }),

//         test('token inserted, but not admin', (done) => {
//             request(app)
//                 .delete(`/category/${id}`)
//                 .set('token', tokenCust)
//                 .end(function (err, res) {
//                     const errors = [`you're not admin!`]
//                     if (err) throw err
//                     else {
//                         expect(res.status).toBe(401)
//                         expect(res.body).toHaveProperty('err', expect.any(Array))
//                         expect(res.body.err).toEqual(errors)
//                         done()
//                     }
//                 })
//         })
// })

describe('Delete -- Success Case', () => {
    test('send correct token and input', (done) => {
        request(app)
            .delete(`/category/${id}`)
            // .set('token', token)
            .end(function (err, res) {
                if (err) throw err
                else {
                    expect(res.status).toBe(200);
                    expect(res.body).toBe('Category success to delete')
                    done()
                }
            })
    })
})
