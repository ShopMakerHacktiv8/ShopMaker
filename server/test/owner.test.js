const request = require('supertest')
const app = require('../index')
const { Owner, Toko } = require('../models')
const jwt = require('jsonwebtoken')

//ini buat create, read, delete test
let dummy = {
    nama : "toren",
    logo_path : "www.google.com",
    alamat : "Jakarta",
    deskripsi : "toko keren"
}

//ini buat update test
let dummy = {
    nama : "toren",
    logo_path : "www.google.com",
    alamat : "Bandung",
    deskripsi : "toko keren"
}

//ini buat login/register. jangan di apa apain
let user = {
    email : "bagas@email.com",
	password :  "bagas123",
	nama : "bagas ganteng",
	image_url : "https://www.youngontop.com/wp-content/uploads/2020/01/hallo-indo-600x450.jpeg"
}

/*
ini buat crudnya, jadi sebelum test dia bikin user dummy buat ngejalanin crud.
kalo mau gampang bikin langsung di database testnya, biar ga bentrok sama login/register test
*/
beforeAll(function(done) {
    Owner.create(user2)
    .then(data => {
        done()
    })
    .catch(err => {
        done(err)
    }),

    Owner.findOne({
        where : {
            email : user2.email
        }
    })
    .then(data => {
        let param = {
            id : data.id,
            email : data.email
        }
        tokenCust = jwt.sign(param, process.env.SECRET)
        done()
    })
    .catch(err => {
        done(err)
    }),

    Toko.create(dummy2)
        .then(data => {
            id = data.id
            done()
        })
        .catch(err => {
            done(err)
        })
  });


/*ini buat apus data di database, biar kalo di test databasenya kereset lagi
nanti kalo mau crud test jangan lupa datanya diapus juga disini
buat test crudnya dimulai dari line 381
*/

afterAll(() => {
    Owner.destroy({
        where : {
            email : user.email
        }
    })
});

describe('Register -- Success Case', () => {
    test('send correct email and password', (done) => {
        request(app)
            .post('/owner/register')
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
            .post('/owner/login')
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
            .post('/owner/login')
            .send({
                email: "ownermail.com",
                password: "owner123"
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
                .post('/owner/login')
                .send({
                    email: "owner@email.com",
                    password: "owner"
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
                .post('/owner/login')
                .send({
                    email: "",
                    password: "owner"
                }, {
                    password: "owner"
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
                .post('/owner/login')
                .send({
                    email: "owner@email.com",
                    password: ""
                }, {
                    email: "owner@email.com"
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

describe('Create -- Success Case', () => {
    test('send correct token and input', (done) => {
        request(app)
        .post('/owner')
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
        .post('/owner')
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
        .post('/owner')
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
        .post('/owner')
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
        .post('/owner')
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
        .post('/owner')
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
        .post('/owner')
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
        .post('/owner')
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
        .post('/owner')
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


//crud tempelate. boleh diedit sesuka hati
describe('Read -- Success Case', () => {
    test('send correct token', (done) => {
        request(app)
        .get('/owner')
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
        .get('/owner')
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
    test('token inserted, but not owner', (done) => {
        request(app)
        .get('/owner')
        .set('token', tokenCust)
        .end(function(err,res) {
            const errors = [`you're not owner!`]
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
        .put(`/owner/${id}`)
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
        .put(`/owner/${id}`)
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
        .put(`/owner/${id}`)
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
        .put(`/owner/${id}`)
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
        .put(`/owner/${id}`)
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
        .put(`/owner/${id}`)
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
        .put(`/owner/${id}`)
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
        .put(`/owner/${id}`)
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
        .put(`/owner/${id}`)
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
        .delete(`/owner/${id}`)
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

    test('token inserted, but not owner', (done) => {
        request(app)
        .delete(`/owner/${id}`)
        .set('token', tokenCust)
        .end(function(err,res) {
            const errors = [`you're not owner!`]
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
        .delete(`/owner/${id}`)
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