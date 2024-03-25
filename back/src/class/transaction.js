class UserTransaction {
  static count = 1

  constructor(sender, getter, type, amount) {
    this.id = UserTransaction.count++

    this.sender = sender
    this.getter = getter
    this.type = type
    this.amount = amount
    this.date = new Date()
  }
}

module.exports = {
  UserTransaction,
}
