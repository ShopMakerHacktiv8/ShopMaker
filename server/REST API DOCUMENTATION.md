###### API DOCUMENTATION

Make Shop

### Register a new user, using app auth

> ###### POST  /users/register

```javascript
app.post('/owner/register')
```

require body : email(string), password(string)

if one or more body field isn't filled or didnt meet the requirements, one of these error will be shown

```javascript
{"errors": "Email harus diisi"}
{"errors": "Format email salah"}
{"errors": "Password harus diisi"}
{"errors": "Password hanya boleh menggunakan huruf dan angka"}
```

if not, this call will return a new user object and saves it on database

### Login using app auth

> ###### POST /users/login

```javascript
app.post('/owner/login')
```

require body: email(string), password(string)

if the input didnt match with the user's data on database, this call will return an error

```javascript
{"errors": "wrong email or password"}
```