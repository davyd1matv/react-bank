//Пдключаємо технологію express для back-end сервера
const express = require('express')
// Створюємо роутер - місце, куди ми підключимо ендпоїнсти
const router = express.Router()

// const { BankLog } = require('../class/post')
const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { CreateUser } = require('../class/createUser')

// Test
// User.create({
//   email: 'user@test.com',
//   password: 123,
//   role: 1,
// })

// Підключіть файли роутів

router.post('/signup', function (req, res) {
  const { email, password } = req.body
  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      message:
        'Потрібно передати email та password для створення акаунту',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Користуввач з таким Email вже створено',
      })
    }
    const newUser = User.create({ email, password })

    const session = Session.create(newUser)

    Confirm.create(newUser.email)

    // const id = generateUniqueID() // Додати логіку генерації ID
    // // const newUserId = CreateUser.generateRandomId()

    // const newUser = CreateUser.create(email, password, id)
    // console.log(id)
    // console.log(newUser)

    return res.status(200).json({
      post: {
        message: 'Реєстрування пройшло вдало!',
        session,
        // email: newUser.email,
        // password: newUser.password, // Додати password до JSON
        // // date: newUser.date,
      },
    })
  } catch (e) {
    return res.status(400).json({
      message: 'Помилка при створенні користувача',
    })
  }
})

router.post('/signup', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Не хватає даних',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач вже існує',
      })
    }

    const newUser = User.create({ email, password })
    console.log('newUser', newUser)

    const session = Session.create(newUser)

    const confirmationCode = Confirm.create(newUser.email)

    saveSession(session)

    console.log('confirmationCode', confirmationCode)

    return res.status(200).json({
      message: 'Користувач успішно зареєстрованний',
      session,
      confirmationCode,
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

// router.get('/signup', function (req, res) {
//   try {
//     const list = CreateUser.getList()

//     console.log(list)

//     return res.status(200).json({
//       list: list.map(({ id, email }) => ({
//         id,
//         email,
//       })),
//     })
//   } catch (e) {
//     return res.status(400).json({
//       //   message: e.message,
//       message: 'Помилка',
//     })
//   }
// })

router.get('/signup-confirm', function (req, res) {
  const { renew, email } = req.query

  try {
    if (renew) {
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

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

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

//підключаємо роутер до бек-енду

module.exports = router
