const $ = window.$
const url = window.location.pathname
$('.menu-top-item').on('click', (e) => {
  if (!$(e.currentTarget).hasClass('menu-top-active')) {
    $('.menu-top-item').removeClass('menu-top-active')
    $(e.currentTarget).addClass('menu-top-active')
  }
})

if (url === '/') {
  $('.menu-top-item[tag="inicio"]').addClass('menu-top-active')
} else if (url.includes('/blog')) {
  $('.menu-top-item[tag="blog"]').addClass('menu-top-active')
} else if (url.includes('/sobre')) {
  $('.menu-top-item[tag="sobre"]').addClass('menu-top-active')
} else if (url.includes('/wikimap')) {
  $('.menu-top-item[tag="wikimap"]').css('box-shadow', '0px 0px 0px 1px #303030')
}

// eslint-disable-next-line no-unused-vars
function copyClipboard (id) {
  const copyText = document.getElementById(id).getAttribute('data-id')

  const input = document.createElement('input')
  input.value = copyText
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}
