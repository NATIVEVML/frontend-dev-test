import { Widget } from 'blue-widgets'
import { events, dom } from 'blue-js'
import $ from 'jquery'

const LIPIXELWIDTH = 55
const ACTIVE_CLASS = 'active'
const TASKLIST = [{
  may: [
    {
      name: 'May Task 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'completed'
    }
  ],
  jun: [
    {
      name: 'June Task 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'completed'
    },
    {
      name: 'June Task 2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'outstanding'
    }
  ],
  jul: [
    {
      name: 'July Task 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'outstanding'
    },
    {
      name: 'July Task 2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'completed'
    }
  ],
  aug: [
    {
      name: 'August Task 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'outstanding'
    }
  ],
  sep: [
    {
      name: 'Septemper Task 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'outstanding'
    },
    {
      name: 'Septemper Task 2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'outstanding'
    }
  ]
}]

class DateSlider extends Widget {
  constructor (el) {
    super(el)
    this.sliderItems = el.querySelectorAll('[data-month]')
    const taskList = document.getElementById('tasklist')
    const dateSlider = document.getElementById('dateSlider')

    this.sliderItems.forEach((el) => {
      events.listen(el, 'click', () => {
        this.sliderItems.forEach((el) => {
          dom.removeClass(el, ACTIVE_CLASS)
        })
        let itemIndex = $(el).index()
        let pixelWidth = LIPIXELWIDTH*itemIndex
        if (pixelWidth === 0) {
          pixelWidth = 30
        }
        $(dateSlider).animate({
          marginLeft: -pixelWidth
        }, 100)
        dom.addClass(el, ACTIVE_CLASS)
        this.output = this.animate(el)
        taskList.innerHTML = this.output
      })
    })
  }
  animate (element) {
    let month = element.dataset.month
    let tasklist = TASKLIST[0][month]
    let output = ''
    tasklist.forEach((el) => {
      output += `
      <li class="${el.status}">
        <span>
          <h3>${el.name}</h3>
          <p>${el.text}</p>
        </span>
      </li>
      `
    })
    return output
  }
  changeTasks (el) {

  }
}

export default DateSlider
