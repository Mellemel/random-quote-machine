global.jQuery = require('jquery')
require('./typed.js')

jQuery(document).ready(() => {
  jQuery.ajaxSetup({ cache: false })
  getQuote(writeQuote)

  jQuery('.primary').click(() => {
    jQuery('.typed-cursor').remove()
    jQuery('.quote, .author').empty()
    getQuote(writeQuote)
  })
})

function getQuote(cb) {
  var url = 'https://crossorigin.me/http://api.forismatic.com/api/1.0/'

  var options = {
    method: 'getQuote',
    format: 'json',
    lang: 'en'
  }

  jQuery.getJSON(url, options, (data)=>{
    cb(data)
  })
}

function writeQuote(data) {
  var quote = data.quoteText, author = data.quoteAuthor || 'Anonymous'

  let typedOptions = {
    strings: ['"'+quote+'"'],
    typeSpeed: 50,
    contentType: 'text',
    callback: () => {
      typedOptions.strings = ['- ' + author]
      jQuery('.typed-cursor').remove()
      delete typedOptions.callback
      jQuery('.author').typed(typedOptions)
    }
  }
  jQuery('.quote').typed(typedOptions)
}