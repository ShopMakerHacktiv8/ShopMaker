const request = require('supertest')
const app = require('../index')
const { Customer } = require('../models')
const jwt = require('jsonwebtoken')

let user = {
    email : "bagas@email.com",
	password :  "bagas123",
	nama : "bagas ganteng",
	image_url : "https://www.youngontop.com/wp-content/uploads/2020/01/hallo-indo-600x450.jpeg"
}

afterAll(() => {
    Customer.destroy({
        where : {
            email : user.email
        }
    })
});

describe('Register -- Success Case', () => {
    test('send correct email and password', (done) => {
        request(app)
            .post('/customer/register')
            .send(user)
            .end(function (err, res) {
                if (err) throw err
                else {
                    expect(res.status).toBe(201)
                    expect(res.body).not.toHaveProperty('password')
                    expect(res.body).toHaveProperty('id', expect.any(Number))
                    expect(res.body).toHaveProperty('email', expect.any(String))
                    expect(res.body).toHaveProperty('nama', expect.any(String))
                    expect(res.body).toHaveProperty('image_url', expect.any(String))
                    done()
                }
            })
    })
})


describe('Login -- Success Case', () => {
    test('send correct email and password', (done) => {
        request(app)
            .post('/customer/login')
            .send(user)
            .end(function (err, res) {
                if (err) throw err
                else {
                    expect(res.status).toBe(200);
                    expect(res.headers).toHaveProperty('token', res.text.token)
                    expect(res.body).not.toHaveProperty('password')
                    done()
                }
            })
    })
})

describe('Login -- Err Case', () => {
    test('send incorrect email', (done) => {
        request(app)
            .post('/customer/login')
            .send({
                email: "adminmail.com",
                password: "admin123"
            })
            .end(function (err, res) {
                const errors = ['invalid email or password!']
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('err', expect.any(Array))
                    expect(res.body.err).toEqual(errors)
                    done()
                }
            })
    }),
        test('send incorrect password', (done) => {
            request(app)
                .post('/customer/login')
                .send({
                    email: "admin@email.com",
                    password: "admin"
                })
                .end(function (err, res) {
                    const errors = ['invalid email or password!']
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('err', expect.any(Array))
                        expect(res.body.err).toEqual(errors)
                        done()
                    }
                })
        }),
        test('email is empty', (done) => {
            request(app)
                .post('/customer/login')
                .send({
                    email: "",
                    password: "admin"
                }, {
                    password: "admin"
                })
                .end(function (err, res) {
                    const errors = ['password or email cannot be empty!']
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('err', expect.any(Array))
                        expect(res.body.err).toEqual(errors)
                        done()
                    }
                })
        }),
        test('password is empty', (done) => {
            request(app)
                .post('/customer/login')
                .send({
                    email: "admin@email.com",
                    password: ""
                }, {
                    email: "admin@email.com"
                })
                .end(function (err, res) {
                    const errors = ['password or email cannot be empty!']
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
