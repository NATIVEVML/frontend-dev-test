import { Widget } from 'blue-widgets'
var moment = require('moment')

class DateTime extends Widget {
  constructor (el) {
    super (el)
    let currentDate = moment().format('MMMM Do YYYY')
    this.daydate = document.getElementById('daydate')
    this.time = document.getElementById('time')
    let currentTime = moment().format('h:mm a')
    this.time.innerHTML = currentTime
    this.daydate.innerHTML = currentDate
    let ss = setInterval(() => {
      let currentTime = moment().format('h:mm a')
      this.time.innerHTML = currentTime
      this.daydate.innerHTML = currentDate
    }, 1000)
  }
}

export default DateTime
