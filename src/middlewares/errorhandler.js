module.exports = (err, req, res, next) => {
  const validationErrors = []
  if (err.status) {
    res.status(err.status).json({ message: err.message })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: err.message })
  } else if (err.name === 'SequelizeValidationError') {
    err.errors.forEach(error => validationErrors.push(error.message));
    res.status(400).json({ messages: validationErrors })
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
}