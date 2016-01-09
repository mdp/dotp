function redirect(publicID) {
  console.log('redirect')
  let search = window.location.search
  if (search && search.length > 0) {
    window.location = decodeURIComponent(search).replace('?redir=','').replace(/\?$/, publicID);
  }
}

$(document).ready(function(){
  $('#reader').html5_qrcode(function(data){
    $('#read').html(data);
    document.body.style.background = '#44AA44';
    redirect(data);
  },
  function(error){
  }, function(videoError){
    $('#vid_error').html('Video Error:' + videoError);
  })
});
