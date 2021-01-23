module.exports = (err, req, res, next) => {
  const validationErrors = [];
  if (err.status) {
    res.status(err.status).json(err.message)
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: 'Email has already use' })
  } else if (err.name === 'SequelizeValidationError') {
    err.errors.forEach(error => validationErrors.push(error.message));
    res.status(401).json({ messages: validationErrors })
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
}