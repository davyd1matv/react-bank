const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Session } = require('../class/session')

// ================================================================

router.get('/balance', function (req, res) {
  try {
    const token = req.query.token
    console.log('token-balance', token)

    if (!token) {
      return res.status(400).json({
        message: 'No token found',
      })
    }

    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Invalid session token',
      })
    }

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
  const { token, password, email } = req.body

  if (!password || !email || !token) {
    return res.status(400).json({
      message: 'Required fields are missing',
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

    if (user.email === email) {
      return res.status(400).json({
        message: 'You already have this email',
      })
    }

    const newEmail = User.getByEmail(email)

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
    user.email = String(email)

    const newSession = Session.create(user)

    console.log('newSession', newSession)

    const notification = user.createNotification(
      'New email',
      'Warning',
    )

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
  const { password, passwordNew, token } = req.body

  if (!password || !passwordNew) {
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

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Incorrect password',
      })
    }

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

router.post('/receive-stripe', function (req, res) {
  const { amount, token } = req.body

  if (!token) {
    return res.status(400).json({
      message: 'No token found',
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
        message: 'Enter a number',
      })
    } else if (valueAmount <= 0) {
      return res.status(400).json({
        message: 'The sum must be positive',
      })
    } else if (valueAmount >= 10000) {
      return res.status(400).json({
        message: 'The sum is too high',
      })
    } else if (
      (String(amount).startsWith('0') &&
        !String(amount).includes('.')) ||
      (String(valueAmount).includes('.') &&
        String(valueAmount).split('.')[1].length > 2)
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
      message: 'No token found',
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
        message: 'Enter a number',
      })
    } else if (valueAmount <= 0) {
      return res.status(400).json({
        message: 'The sum must be positive',
      })
    } else if (valueAmount >= 10000) {
      return res.status(400).json({
        message: 'The sum is too high',
      })
    } else if (
      (String(amount).startsWith('0') &&
        !String(amount).includes('.')) ||
      (String(valueAmount).includes('.') &&
        String(valueAmount).split('.')[1].length > 2)
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

router.post('/send', function (req, res) {
  const { email, amount, token } = req.body

  if (!amount || !email || !token) {
    return res.status(400).json({
      message: 'Required fields are missing',
    })
  }

  const getter = User.getByEmail(email)

  if (!getter) {
    return res.status(400).json({
      message: 'Getter is not found',
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
        message: `This is your email. Enter the recipient's address`,
      })
    }

    const valueAmount = Number(amount)

    if (user.balance < valueAmount) {
      return res.status(400).json({
        message: 'This amount exceeds your balance',
      })
    }

    if (isNaN(valueAmount)) {
      return res.status(400).json({
        message: 'Enter a number',
      })
    } else if (valueAmount <= 0) {
      return res.status(400).json({
        message: 'The sum must be positive',
      })
    } else if (valueAmount >= 10000) {
      return res.status(400).json({
        message: 'The sum is too high',
      })
    } else if (
      (String(amount).startsWith('0') &&
        !String(amount).includes('.')) ||
      (String(valueAmount).includes('.') &&
        String(valueAmount).split('.')[1].length > 2)
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
      session: session,
      transaction,
      transactiongetter,
      notification,
      notificationgetter,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.get('/notifications', function (req, res) {
  const token = req.query.token
  console.log('notification-token', token)
  try {
    console.log('notification-token', token)

    if (!token) {
      return res
        .status(400)
        .json({ message: 'No token found' })
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
})

router.get('/transaction', function (req, res) {
  try {
    const idTran = req.query.transactionId
    console.log('transaction-id', idTran)

    if (!idTran) {
      return res.status(400).json({
        message: 'No ID found',
      })
    }

    const token = req.query.token
    console.log('transaction-token', token)

    if (!token) {
      return res.status(400).json({
        message: 'No token found',
      })
    }

    const session = Session.get(token)

    const user = User.getByEmail(session.user.email)

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

module.exports = router
