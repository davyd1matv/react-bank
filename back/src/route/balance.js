const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Session } = require('../class/session')

// ================================================================

router.get('/balance', function (req, res) {
  // редаговано з get
  try {
    const token = req.query.token
    console.log('token-balance', token)
    const session = Session.get(token)
    const transactions = session.user.getTransactions()
    const list = []

    transactions.forEach((element) => {
      const elementCopy = { ...element }
      list.push(elementCopy)
    })

    const roundedBalance = parseFloat(
      session.user.balance,
    ).toFixed(2)

    list.reverse()
    // Для хронологічного порядку

    // Слід буде спробувати замінити list на transaction

    console.log('transaction', transactions)
    console.log('list', list)

    res.status(200).json({
      balance: roundedBalance,
      transactions: list || [],
    })
  } catch (error) {
    console.error('Error fetching balance data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/change-email', function (req, res) {
  const { password, email, token } = req.body

  //   console.log('change-email', password, email, token)

  if (!password || !email || !token) {
    return res.status(400).json({
      message: 'Required fields are missing',
    })
  }

  //   const emailRegex =
  //     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  //   if (!emailRegex.test(email)) {
  //     return res.status(400).json({
  //       message: 'Invalid email format',
  //     })
  //   }
  // Слід перемістити в файл фронта

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Invalid session token',
      })
    }

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      })
    }

    if (user.email === email) {
      return res.status(400).json({
        message: 'You already have this email',
      })
    }

    // const newEmail = User.getByEmail(email)

    if (newEmail) {
      return res.status(400).json({
        message: 'User with this email already exists',
      })
    }

    if (password !== user.password) {
      return res.status(400).json({
        message: 'Invalid password',
      })
    }

    const oldEmail = user.email
    user.email = String(email)

    const newSession = Session.create(user)

    console.log('newSession', newSession)

    const notification = user.createNotification(
      'New email',
      'Warning',
    )

    // User.changeEmailInTransactions(oldEmail, user.email)
    // Для перевірки, чи і справді не оновлюється email у вжепроедених операціях

    return res.status(200).json({
      message: 'Email updated successfully',
      notification,
      session: newSession,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/change-password', function (req, res) {
  const { passwordOld, passwordNew, token } = req.body

  if (!passwordOld || !passwordNew || !token) {
    return res.status(400).json({
      message: 'Required fields are missing',
    })
  }

  try {
    const session = Session.get(token)

    console.log(session.user)

    if (!session) {
      return res.status(400).json({
        message: 'Invalid session token',
      })
    }

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found with the provided email',
      })
    }

    if (user.password !== passwordOld) {
      return res.status(400).json({
        message: 'Incorrect password',
      })
    }

    // const passwordRegex =
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    // if (!passwordRegex.test(passwordNew)) {
    //   return res.status(400).json({
    //     message: 'Invalid password format',
    //   })
    // }

    // const newPasword = User.getByPassword(pas)

    user.password = String(passwordNew)

    const newSession = Session.create(user)

    console.log('newSession', newSession)

    const notification = user.createNotification(
      'New password',
      'Warning',
    )

    return res.status(200).json({
      message: 'Password updated successfully',
      notification,
      session: newSession,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.get('/notifications', function (req, res) {
  // перероблено з get

  const token = req.query.token
  console.log('notification-token', token)
  try {
    // const token = req.body
    // const token = req.body

    console.log('notification-token', token)

    if (!token) {
      return res
        .status(400)
        .json({ error: 'Token is required' })
    }

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

    if (!session || !session.user) {
      return res
        .status(401)
        .json({ error: 'Invalid token' })
    }

    const notifications = session.user.getNotifications()
    const listNotf = []

    notifications.forEach((element) => {
      const elementCopy = { ...element }

      listNotf.push(elementCopy)
    })

    listNotf.reverse()

    res.status(200).json({
      notifications: listNotf || [],
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}) // Слід ще перевірити

// ==================================

router.post('/receive-stripe', function (req, res) {
  const { amount, token } = req.body

  if (!token) {
    return res.status(400).json({
      message: 'Token is missing',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Invalid session token',
      })
    }

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      })
    }

    const valueAmount = Number(amount)

    if (isNaN(valueAmount)) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else if (valueAmount <= 0) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else if (
      (String(amount).startsWith('0') &&
        !String(amount).includes('.')) ||
      (String(valueAmount).includes('.') &&
        String(valueAmount).split('.')[1].length > 2)
      // Слід переробити
    ) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else {
      const newBalance = user.receive(valueAmount)

      //   user.balance = newBalance
      session.user.balance = newBalance
    }

    const notification = user.createNotification(
      'New reward system',
      'Announcement',
    )

    const transaction = user.createTransaction(
      'Stripe',
      user.email,
      'Receipt',
      amount,
    )

    return res.status(200).json({
      message: 'Transaction was successful',
      transaction,
      notification,
      session: session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/receive-coin', function (req, res) {
  const { amount, token } = req.body

  if (!token) {
    return res.status(400).json({
      message: 'Token is missing',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Invalid session token',
      })
    }

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      })
    }

    const valueAmount = Number(amount)

    if (isNaN(valueAmount)) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else if (valueAmount <= 0) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else if (
      (String(amount).startsWith('0') &&
        !String(amount).includes('.')) ||
      (String(valueAmount).includes('.') &&
        String(valueAmount).split('.')[1].length > 2)
      // Слід переробити
    ) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else {
      const newBalance = user.receive(valueAmount)

      //   user.balance = newBalance
      session.user.balance = newBalance
    }

    const notification = user.createNotification(
      'New reward system',
      'Announcement',
    )

    const transaction = user.createTransaction(
      'Coin',
      user.email,
      'Receipt',
      amount,
    )

    return res.status(200).json({
      message: 'Transaction was successful',
      transaction,
      notification,
      session: session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ==================================

router.get('/transaction', function (req, res) {
  // Перероблено з get
  try {
    const idTran = req.query.transactionId
    console.log('transaction-id', idTran)

    const token = req.query.token
    console.log('transaction-token', token)

    // const transactionId = req.query.transactionId

    const session = Session.get(token)

    // if (!session || !session.user || !session.user.email) {
    //   return res.status(400).json({
    //     message: 'Invalid session or user data',
    //   })
    // }

    const user = User.getByEmail(session.user.email)

    // if (!user) {
    //   return res.status(400).json({
    //     message: 'User not found',
    //   })
    // }

    const transaction = user.getTransactionById(
      Number(idTran),
    )

    console.log('transaction-tran', transaction)

    if (!transaction) {
      return res.status(400).json({
        message: 'Transaction not found',
      })
    }

    res.status(200).json({
      getter: transaction.getter,
      transaction: transaction,
    })
  } catch (error) {
    console.error(
      `Error fetching transaction: ${error.message}`,
    )
    res.status(500).json({ error: 'Internal server error' })
  }
})

// router.get(
//   '/transaction/:transactionId',
//   function (req, res) {
//     // Перероблено з get
//     try {
//       const idTran = req.params.transactionId
//       if (!idTran) {
//         console.log('trnsaction-error Why???')
//       }
//       console.log('transaction-id', idTran)

//       const token = req.query.token
//       console.log('transaction-token', token)

//       // const transactionId = req.query.transactionId

//       const session = Session.get(token)

//       // if (!session || !session.user || !session.user.email) {
//       //   return res.status(400).json({
//       //     message: 'Invalid session or user data',
//       //   })
//       // }

//       // const user = User.getByEmail(session.user.email)

//       // if (!user) {
//       //   return res.status(400).json({
//       //     message: 'User not found',
//       //   })
//       // }

//       const transaction = user.getTransactionById(
//         Number(idTran),
//       )

//       console.log('transaction-tran', transaction)

//       if (!transaction) {
//         return res.status(400).json({
//           message: 'Transaction not found',
//         })
//       }

//       res.status(200).json({
//         getter: transaction.getter,
//         transaction: transaction,
//       })
//     } catch (error) {
//       console.error(
//         `Error fetching transaction: ${error.message}`,
//       )
//       res
//         .status(500)
//         .json({ error: 'Internal server error' })
//     }
//   },
// )

// ==================================

router.post('/send', function (req, res) {
  const { email, amount, token } = req.body

  if (!amount || !email) {
    return res.status(400).json({
      message: 'Required fields are missing',
    })
  }

  if (!token) {
    return res.status(400).json({
      message: 'Token is missing',
    })
  }

  const getter = User.getByEmail(email)

  if (!getter) {
    return res.status(400).json({
      message: 'getter is not found',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Invalid session token',
      })
    }

    const user = User.getByEmail(session.user.email)

    if (user.email === getter.email) {
      return res.status(400).json({
        message: 'Error. You cannot send funds to yourself',
      })
    }

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      })
    } // можливо слід прибрати, адже вже перевіряло, чи є користувач, котрий авто ризований зараз

    const valueAmount = Number(amount)

    if (user.balance < valueAmount) {
      return res.status(400).json({
        message:
          'Sorry, but this amount exceeds your balance',
      })
    }

    if (isNaN(valueAmount)) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else if (valueAmount <= 0) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else if (
      (String(amount).startsWith('0') &&
        !String(amount).includes('.')) ||
      (String(valueAmount).includes('.') &&
        String(valueAmount).split('.')[1].length > 2)
      // Слід переробити
    ) {
      return res.status(400).json({
        message: 'Enter a valid value',
      })
    } else {
      const newBalance = user.send(valueAmount)

      if (isNaN(newBalance)) {
        return res.status(400).json({
          message: 'Error! Enter a valid value',
        })
      }

      const updateGetter = getter.receive(valueAmount)

      if (isNaN(updateGetter)) {
        return res.status(400).json({
          message: 'Error! Enter a valid value',
        })
      }

      //   getter.balance = updateGetter
      // По ідеї цей код не потрібний, адже у всіх користувачів стартовий balance = 0, а функція вище вже оновила значення balance

      //   if (isNaN(newBalance)) {
      //     return res.status(400).json({
      //       message:
      //         'Enter a valid numeric value for the amount',
      //     })
      //   }

      // !!! newBalance тут не згадується

      //   if (newBalance < 0) {
      //     return res.status(400).json({
      //       message: 'Balance update failed',
      //     })
      //   }

      //   user.balance = newBalance
      //   session.user.balance = newBalance
      // Це теж зайве, але можливо слід зробити од дл онвлення Session
    }

    const notificationgetter = getter.createNotification(
      'Receiving funds',
      'Announcement',
    )

    const transactiongetter = getter.createTransaction(
      user.email,
      getter.email,
      'Receipt',
      amount,
    )

    const notification = user.createNotification(
      'Debiting funds',
      'Warning',
    )

    const transaction = user.createTransaction(
      getter.email,
      getter.email,
      'Sending',
      amount,
    )

    return res.status(200).json({
      message: 'Transaction was successful',
      transaction,
      notification,
      notificationgetter,
      transactiongetter,
      session: session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
}) // Начебто є, але можливе дороблення

module.exports = router
