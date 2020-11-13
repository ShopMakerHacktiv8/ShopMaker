const errorHandler = (err, req, res, next) => {
  // console.log(err);

  let errors = []
  let statusCode = 500

  switch (err.name) {
    case 'AuthorizationFailed':
      errors.push('authorization failed')
      statusCode = 403
      break
    case 'JsonWebTokenError':
    case 'AuthenticationFailed':
      errors.push('authentication failed')
      statusCode = 401
      break
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      err.errors.forEach((error) => errors.push(error.message))
      statusCode = 400
      break
    default:
      errors.push(err.msg || 'internal server error')
      statusCode = err.statusCode || 500
      break
  }

  res.status(statusCode).json({ errors })
}

module.exports = errorHandler
