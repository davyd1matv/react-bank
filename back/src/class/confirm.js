class Confirm {
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    // this.code = code
    this.data = data
  }

  static generateCode = () =>
    Math.floor(Math.random() * 9000) + 1000

  static create = (data) => {
    const conf = new Confirm(data)
    this.#list.push(conf)

    //   this.#list.push(new Confirm(data)) // Можливо слід записати ось так

    setTimeout(() => {
      this.delete(conf.code)
    }, 24 * 60 * 60 * 1000) // 24 hours, miliSecond

    console.log(this.#list)

    return conf
  }

  static delete = (code) => {
    const length = this.#list

    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )

    return length > this.#list.length
  }

  static getData = (confCode) => {
    const obj = this.#list.find(
      (item) => item.code === confCode,
    )

    return obj ? obj.data : null
  }

  static getCodeByData = (data) => {
    const confirmObject = this.#list.find(
      (item) =>
        JSON.stringify(item.data) === JSON.stringify(data),
    )
    return confirmObject ? confirmObject.code : null
  }
}

module.exports = {
  Confirm,
}
