let dotpCrypt = require('dotp-crypt')

function redirect(publicID) {
  console.log('redirect')
  let search = window.location.search
  if (search && search.length > 0) {
    window.location = decodeURIComponent(search).replace('?redir=','').replace(/\?$/, publicID);
  }
}

function forceSSL() {
  if (window.location.href.indexOf('http:') === 0) {
    window.location = window.location.href.replace(/^http\:/, 'https:')
  }
}

$(document).ready(function(){
  forceSSL()
  $('#reader').html5_qrcode(function(data){
    $('#read').html(data);
    try {
      dotpCrypt.getPublicKeyFromPublicID(data)
      document.body.style.background = '#44AA44';
      redirect(data);
    } catch (e) {
      console.log('Bad decode:', e)
    }
  },
  function(error){
  }, function(videoError){
    $('#vid_error').html('Video Error:' + videoError);
  })
});
