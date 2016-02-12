webpackHotUpdate(1,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(196), RootInstanceProvider = __webpack_require__(204), ReactMount = __webpack_require__(206), React = __webpack_require__(258); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var dotpCrypt = __webpack_require__(506);

	function redirect(publicID) {
	  console.log('redirect');
	  var search = window.location.search;
	  if (search && search.length > 0) {
	    window.location = decodeURIComponent(search).replace('?redir=', '').replace(/\?$/, publicID);
	  }
	}

	function forceSSL() {
	  if (window.location.href.indexOf('http:') === 0) {
	    window.location = window.location.href.replace(/^http\:/, 'https:');
	  }
	}

	$(document).ready(function () {
	  forceSSL();
	  $('#reader').html5_qrcode(function (data) {
	    console.log(data);
	    $('#read').html(data);
	    try {
	      console.log(data);
	      dotpCrypt.getPublicKeyFromPublicID(data);
	      document.body.style.background = '#44AA44';
	      redirect(data);
	    } catch (e) {
	      console.log('Bad decode:', e);
	    }
	  }, function (error) {}, function (videoError) {
	    $('#vid_error').html('Video Error:' + videoError);
	  });
	});

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(498); if (makeExportsHot(module, __webpack_require__(258))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "scan.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(195)(module)))

/***/ }
])