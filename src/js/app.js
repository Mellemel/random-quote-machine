global.jQuery = require('jquery')
require('./typed.js')

jQuery(() => {

  jQuery.getJSON('https://crossorigin.me/http://api.forismatic.com/api/1.0/', {
    method: 'getQuote',
    format: 'json',
    lang: 'en'
  },
    (data) => {
      var quote = data.quoteText, author = data.quoteAuthor || 'Unknown'

      console.log(quote.length)
      var typedOptions = {
        strings: [quote],
        typeSpeed: 20,
        contentType: 'text',
        callback: () => {
          typedOptions.strings = ['- '+ author]
          typedOptions.showCursor = false
          delete typedOptions.callback
          jQuery('.author').typed(typedOptions)
        }
      }
      jQuery('.quote').typed(typedOptions)
    })
})