const express = require('express')
const { registerNewUser, signin } = require('./auth-controller')
const {
  validateRegisterUser,
  isRegiterValidated,
  validateSignIn
} = require('./auth-validator')
const router = express.Router()

router.post(
  '/signup',
  validateRegisterUser,
  isRegiterValidated,
  registerNewUser
)

router.post('/signin', validateSignIn, isRegiterValidated, signin)

module.exports = router
