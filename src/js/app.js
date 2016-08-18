var quote = '', author = ''

$(document).ready(() => {
  $.ajaxSetup({ cache: false })

  getQuote(writeQuote)

  $('.primary').click(() => {
    $('.typed-cursor').remove()
    $('.quote, .author').empty()
    getQuote(writeQuote)
  })

  $('.secondary').click(() => {
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

  displayText(false)

  // recursively get quotes until there is a one that fits twitter's specifications
  $.getJSON(url, options, (data) => {
    let tweet = data.quoteText + '- ' + data.quoteAuthor

    if (tweet.length > 140) {
      return getQuote(cb)
    } else {
      displayText(true)
      cb(data)
    }
  })
}

function writeQuote(data) {
  quote = data.quoteText, author = data.quoteAuthor || 'Anonymous'

  let typedOptions = {
    strings: ['"' + quote + '"'],
    typeSpeed: 0,
    contentType: 'text',
    callback: () => {
      typedOptions.strings = [author]
      $('.typed-cursor').remove()
      delete typedOptions.callback
      $('.author').typed(typedOptions)
    }
  }
  $('.quote').typed(typedOptions)
}

function displayText(bool) {
  if (bool) {
    $('#loader').hide()
    $('#text .row').show()
  } else {
    $('#loader').show()
    $('#text .row').hide()
  }
}