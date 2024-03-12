function generateRandomId() {
  return (
    Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
  )
}

class CreateUser {
  static #list = []

  constructor(email, password, id) {
    // this.id = generateRandomId()
    this.id = id

    this.email = email
    this.password = password
    // this.postId = postId
    // this.date = new Date().getTime()

    // this.reply = []
  }

  static create(email, password) {
    const id = generateRandomId()
    const newUser = new CreateUser(email, password, id)

    this.#list.push(newUser)

    return newUser
  }

  static getById(id) {
    return (
      this.#list.find((item) => item.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = {
  CreateUser,
}
