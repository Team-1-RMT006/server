module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json(err.message)
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: 'Email has already use' })
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
}