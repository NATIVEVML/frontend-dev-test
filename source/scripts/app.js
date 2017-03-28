import { dom } from 'blue-js'
import { parser, registry } from 'blue-widgets'

// Import project widgets
import * as widgets from './widgets'
var AOS = require('./vendor/aos')

// Add widgets to the registry

registry.add({
  ...widgets
})

// Parse the body element
parser.parse()

// Anything that needs dom ready
dom.onReady(() => {
  AOS.init()
})
