class Notification {
  constructor(text, type) {
    this.text = text
    this.type = type
    this.date = new Date()
  }
}

class Transaction {
  static count = 1

  constructor(sender, getter, type, amount) {
    this.id = Transaction.count++

    this.sender = sender
    this.getter = getter
    this.type = type
    this.amount = amount
    this.date = new Date()
  }
}

class User {
  static #list = []
  static #count = 1

  listNotifications = []
  listTransactions = []
  balance = 0

  constructor({ email, password }) {
    this.id = User.#count++

    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.isConfirm = false
  }

  static create(data) {
    const user = new User(data)

    this.#list.push(user)

    console.log(this.#list)

    return user
  }

  receive(amount) {
    if (!isNaN(amount)) {
      if (amount % 1 !== 0) {
        amount = Math.round(amount * 100) / 100
      }
      this.balance += Number(amount)

      return this.balance
    }
  }

  send(amount) {
    if (!isNaN(amount)) {
      if (amount % 1 !== 0) {
        amount = Math.round(amount * 100) / 100
        // amount = Math.round(amount) // Спрощена версія
      }

      this.balance -= Number(amount)

      return this.balance
    }
  }

  createTransaction(sender, getter, type, amount) {
    const transaction = new Transaction(
      sender,
      getter,
      type,
      amount,
    )

    this.listTransactions.push(transaction)

    return transaction
  }

  getTransactionById(transactionId) {
    const transaction = this.listTransactions.find(
      (transaction) => transaction.id === transactionId,
    )

    return transaction || null
  }

  createNotification(text, type) {
    const notification = new Notification(text, type)

    this.listNotifications.push(notification)

    return notification
  }

  getNotifications() {
    return this.listNotifications
  }

  getTransactions() {
    return this.listTransactions
  }

  static updatePassword(password, passwordNew) {
    const user = this.getByPassword(password)

    if (user) {
      user.password = String(passwordNew)
      console.log('Password updated successfully:', user)
    } else {
      console.log(
        'User not found with the provided old password.',
      )
    }
  }

  static changeEmailInTransactions(email, toEmail) {
    this.#list.forEach((user) => {
      user.listTransactions.forEach((tx) => {
        if (tx.getter === email) tx.getter = toEmail
        if (tx.sender === email) tx.sender = toEmail
      })
    })
  }

  static getByEmail(email) {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLocaleLowerCase(),
      ) || null
    )
  }

  static getByPassword(password) {
    return (
      this.#list.find(
        (user) => user.password === String(password),
      ) || null
    )
  }
}

module.exports = {
  User,
}
