const request = require('supertest')
const app = require('../index')
const {Product, User} = require('../models')
const jwt = require('jsonwebtoken')

let dummy = {
    name : "kemeja",
    image_url : "www.google.com",
    price : 20000,
    stock : 15
}

let dummy2 = {
    name : "kaos",
    image_url : "www.google.com",
    price : 20000,
    stock : 15
}

let user = {
    email : "admin@email.com",
    password : "admin123"
}
let cust = {
    email : "bagas@email.com",
    password : "bagas123"
}

beforeAll(function(done) {
    User.findOne({
        where : {
            email : user.email
        }
    })
    .then(data => {
        let param = {
            email : data.email,
            role : data.role
        }
        token = jwt.sign(param, process.env.SECRET)
        done()
    })
    .catch(err => {
        done(err)
    }),
    User.findOne({
        where : {
            email : cust.email
        }
    })
    .then(data => {
        let param = {
            email : data.email,
            role : data.role
        }
        tokenCust = jwt.sign(param, process.env.SECRET)
        done()
    })
    .catch(err => {
        done(err)
    }),
    Product.create(dummy2)
        .then(data => {
            id = data.id
            done()
        })
        .catch(err => {
            done(err)
        })

  });


afterAll(function(done) {
    Product.destroy({ truncate : true })
        .then( _=> {
            done()
        })
        .catch(err => {
            done(err)
        })
  });

describe('Create -- Success Case', () => {
    test('send correct token and input', (done) => {
        request(app)
        .post('/admin')
        .set('token', token)
        .send(dummy)
        .end(function(err,res) {
            if (err) throw err 
            else {
                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty('id',expect.any(Number))
                expect(res.body).toHaveProperty('name',expect.any(String))
                expect(res.body).toHaveProperty('image_url',expect.any(String))
                expect(res.body).toHaveProperty('price',expect.any(Number))
                expect(res.body).toHaveProperty('stock',expect.any(Number))
                done()
            }
        })
    })
})

describe('Create -- Error Case', () => {
    test('token not inserted', (done) => {
        request(app)
        .post('/admin')
        .set('token', null)
        .send(dummy)
        .end(function(err,res) {
            const errors = ['Unauthorization account!']
            if (err) throw err 
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('wrong token inserted', (done) => {
        request(app)
        .post('/admin')
        .set('token', 'this is wrong token')
        .send(dummy)
        .end(function(err,res) {
            const errors = ['Unauthorization account!']
            if (err) throw err 
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('empty input submitted', (done) => {
        request(app)
        .post('/admin')
        .set('token', token)
        .send({ name : null,
                image_url : "www.google.com",
                price : 20000,
                stock : 15
            })
        .end(function(err,res) {
            const errors = ['name cannot be empty!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('empty input submitted', (done) => {
        request(app)
        .post('/admin')
        .set('token', token)
        .send({ name : "jaket",
                image_url : null,
                price : 20000,
                stock : 15
            })
        .end(function(err,res) {
            const errors = ['image url cannot be empty!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('empty input submitted', (done) => {
        request(app)
        .post('/admin')
        .set('token', token)
        .send({ name : "jaket",
                image_url : "www.google.com",
                price : null,
                stock : 15
            })
        .end(function(err,res) {
            const errors = ['price cannot be empty!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('empty input submitted', (done) => {
        request(app)
        .post('/admin')
        .set('token', token)
        .send({ name : "jaket",
                image_url : "www.google.com",
                price : 20000,
                stock : null
            })
        .end(function(err,res) {
            const errors = ['stock cannot be empty!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),


    test('negative input submitted', (done) => {
        request(app)
        .post('/admin')
        .set('token', token)
        .send({ name : "jaket",
                image_url : "www.google.com",
                price : 20000,
                stock : -5
        })
        .end(function(err,res) {
            const errors = ['please input number above 0!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('Wrong type of input sumbitted', (done) => {
        request(app)
        .post('/admin')
        .set('token', token)
        .send({ name : "jaket",
                image_url : "www.google.com",
                price : "dua puluh ribu",
                stock : 1
        })
        .end(function(err,res) {
            const errors = ['please input number format!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    })
})

describe('Read -- Success Case', () => {
    test('send correct token', (done) => {
        request(app)
        .get('/admin')
        .set('token', token)
        .end(function(err,res) {
            if (err) throw err 
            else {
                expect(res.status).toBe(200);
                expect(res.body).toEqual(expect.any(Array))
                done()
            }
        })
    })
})

describe('Read -- Error Case', () => {
    test('token not inserted', (done) => {
        request(app)
        .get('/admin')
        .set('token', null)
        .end(function(err,res) {
            const errors = ['Unauthorization account!']
            if (err) throw err 
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('token inserted, but not admin', (done) => {
        request(app)
        .get('/admin')
        .set('token', tokenCust)
        .end(function(err,res) {
            const errors = [`you're not admin!`]
            if (err) throw err 
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    })
})

describe('Update -- Error Case', () => {
    test('token not inserted', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', null)
        .send(dummy2)
        .end(function(err,res) {
            const errors = ['Unauthorization account!']
            if (err) throw err 
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('wrong token inserted', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', 'this is wrong token')
        .send(dummy2)
        .end(function(err,res) {
            const errors = ['Unauthorization account!']
            if (err) throw err 
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('empty input submitted', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', token)
        .send({ name : null,
                image_url : "www.google.com",
                price : 20000,
                stock : 15
            })
        .end(function(err,res) {
            const errors = ['name cannot be empty!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('empty input submitted', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', token)
        .send({ name : "jaket",
                image_url : null,
                price : 20000,
                stock : 15
            })
        .end(function(err,res) {
            const errors = ['image url cannot be empty!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('empty input submitted', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', token)
        .send({ name : "jaket",
                image_url : "www.google.com",
                price : null,
                stock : 15
            })
        .end(function(err,res) {
            const errors = ['price cannot be empty!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('empty input submitted', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', token)
        .send({ name : "jaket",
                image_url : "www.google.com",
                price : 20000,
                stock : null
            })
        .end(function(err,res) {
            const errors = ['stock cannot be empty!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),


    test('negative input submitted', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', token)
        .send({ name : "jaket",
                image_url : "www.google.com",
                price : 20000,
                stock : -5
        })
        .end(function(err,res) {
            const errors = ['please input number above 0!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),
    test('Wrong type of input sumbitted', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', token)
        .send({ name : "jaket",
                image_url : "www.google.com",
                price : "dua puluh ribu",
                stock : 1
        })
        .end(function(err,res) {
            const errors = ['please input number format!']
            if (err) throw err 
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    })
})

describe('Update -- Success Case', () => {
    test('send correct token and input', (done) => {
        request(app)
        .put(`/admin/${id}`)
        .set('token', token)
        .send(dummy2)
        .end(function(err,res) {
            if (err) throw err 
            else {
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('id',expect.any(Number))
                expect(res.body).toHaveProperty('name',expect.any(String))
                expect(res.body).toHaveProperty('image_url',expect.any(String))
                expect(res.body).toHaveProperty('price',expect.any(Number))
                expect(res.body).toHaveProperty('stock',expect.any(Number))
                done()
            }
        })
    })
})

describe('Delete -- Error Case', () => {
    test('token not inserted', (done) => {
        request(app)
        .delete(`/admin/${id}`)
        .set('token', null)
        .end(function(err,res) {
            const errors = ['Unauthorization account!']
            if (err) throw err 
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    }),

    test('token inserted, but not admin', (done) => {
        request(app)
        .delete(`/admin/${id}`)
        .set('token', tokenCust)
        .end(function(err,res) {
            const errors = [`you're not admin!`]
            if (err) throw err 
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('err', expect.any(Array))
                expect(res.body.err).toEqual(errors)
                done()
            }
        })
    })
})

describe('Delete -- Success Case', () => {
    test('send correct token and input', (done) => {
        request(app)
        .delete(`/admin/${id}`)
        .set('token', token)
        .end(function(err,res) {
            if (err) throw err 
            else {
                expect(res.status).toBe(200);
                expect(res.body).toBe('Product success to delete')
                done()
            }
        })
    })
})
