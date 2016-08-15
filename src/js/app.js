global.jQuery = require('jquery')
require('./typed.js')

var quote = '', author = ''

jQuery(document).ready(() => {
  jQuery.ajaxSetup({ cache: false })

  getQuote(writeQuote)

  jQuery('.primary').click(() => {
    jQuery('.typed-cursor').remove()
    jQuery('.quote, .author').empty()
    getQuote(writeQuote)
  })

  jQuery('.secondary').click(() => {
    let options = {
      url: 'https://twitter.com/intent/tweet?text=',
      quote: quote,
      author: author
    }
    window.open(options.url + options.quote + '- ' + options.author, '', 'width=550px, height=420px')
  })
})

function getQuote(cb) {
  let url = 'https://crossorigin.me/http://api.forismatic.com/api/1.0/'

  let options = {
    method: 'getQuote',
    format: 'json',
    lang: 'en'
  }

  jQuery.getJSON(url, options, (data) => {
    cb(data)
  })
}

function writeQuote(data) {
  quote = data.quoteText, author = data.quoteAuthor || 'Anonymous'

  let typedOptions = {
    strings: ['"' + quote + '"'],
    typeSpeed: 15,
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