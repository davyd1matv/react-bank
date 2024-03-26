const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')

User.create({
  email: 'taras@test.com',
  password: '123qwe!Q',
})

// ================================================================

router.post('/signup', function (req, res) {
  const { email, password } = req.body

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: 'Required fields are missing',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'User with this email already exists',
      })
    }

    const newUser = User.create({ email, password })

    const session = Session.create(newUser)

    const newcode = Confirm.create(newUser.email)

    return res.status(200).json({
      message: 'User has been successfully registered',
      confirm: newcode,
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating a user',
    })
  }
})

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  console.log('Token2', token)

  if (!code || !token) {
    return res.status(400).json({
      message: 'Required fields are missing',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message:
          'Error. You are not signed in to your account',
      })
    }

    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: 'Code does not exist',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'Code is not valid',
      })
    }

    const user = User.getByEmail(session.user.email)

    user.isConfirm = true
    session.user.isConfirm = true

    return res.status(200).json({
      message: 'You have confirmed your email',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.get('/signup-confirm-code', function (req, res) {
  try {
    const email = req.query.email

    console.log('signup-condirm-code', email)

    if (!email) {
      return res.status(400).json({
        message: 'Email not specified',
      })
    }

    if (email) {
      console.log('email for code 2', email)
      const confirm = Confirm.create(email)

      return res.status(200).json({
        confirm: confirm,
      })
    } else {
      return res.status(400).json({
        message: 'Confirmation failed',
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
})

// ====================================================

router.post('/signin', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Required fields are missing',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'User with this email does not exist',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Password does not match',
      })
    }

    const session = Session.create(user)

    session.user.isConfirm = true

    const notification = user.createNotification(
      'New login',
      'Warning',
    )

    return res.status(200).json({
      message: 'You are logged in',
      notification,
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})
// ====================================================

router.post('/recovery', function (req, res) {
  const { email } = req.body

  console.log('recovery', email)

  if (!email) {
    return res.status(400).json({
      message: 'Required field is missing',
    })
  }

  try {
    const user = User.getByEmail(email)

    console.log('recovery-user-getbyEmail', user)

    if (!user) {
      return res.status(400).json({
        message: 'User with this email does not exist',
      })
    }

    const session = Session.create(user)
    console.log('recovery-session', session)

    const newcode = Confirm.create(email)

    return res.status(200).json({
      message: 'Password recovery code has been sent',
      confirm: newcode,
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body

  console.log('recovery-confirm', password, code)

  if (!code || !password) {
    return res.status(400).json({
      message: 'Required fields are missing',
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'Code does not exist',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'User with this email does not exist',
      })
    }

    user.password = password

    console.log(user)

    const session = Session.create(user)

    return res.status(200).json({
      message: 'Password has been successfully changed',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

router.get('/recovery-confirm-code', function (req, res) {
  try {
    const token = req.query.token

    console.log('recovery-config-code-token', token)

    const session = Session.get(token)

    console.log('recovery-config-code-session', session)
    console.log(
      'recovery-config-code-session',
      session.user,
    )
    console.log(
      'recovery-config-code-session',
      session.user.email,
    )

    const newCode = Confirm.create(session.user.email)
    console.log('newcode', newCode)

    if (newCode) {
      return res.status(200).json({
        message:
          'The new verification code was created successfully',
        confirm: newCode,
      })
    } else {
      return res.status(400).json({
        message: 'Confirmation failed',
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
})

module.exports = router
