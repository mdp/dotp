webpackHotUpdate(0,{

/***/ 493:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, Buffer) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(196), RootInstanceProvider = __webpack_require__(204), ReactMount = __webpack_require__(206), React = __webpack_require__(258); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(258);

	var _react2 = _interopRequireDefault(_react);

	var _dotpCrypt = __webpack_require__(498);

	var _dotpCrypt2 = _interopRequireDefault(_dotpCrypt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QRCode = __webpack_require__(502);

	var containerStyle = {
	  margin: '0 0',
	  padding: '1em 0.5em'
	};

	// This would normally all by done on the server, but for demonstration
	// purposes we are doing it all client side

	function randomUpTo(k, r, s) {
	  var uint8 = new Uint8Array(1);
	  uint8 = window.crypto.getRandomValues(uint8)[0];
	  var n = 256;
	  var x = uint8;
	  r = r || 0;
	  s = s || 1;
	  r = r * n + x;
	  s = s * n;
	  if (r >= s / k * k) {
	    r = s / k;s = s - s / k * k;
	    randomUpTo(k, r, s);
	  } else {
	    return r % k;
	  }
	}

	var Challenger = function (_React$Component) {
	  _inherits(Challenger, _React$Component);

	  function Challenger(p, c) {
	    _classCallCheck(this, Challenger);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Challenger).call(this, p, c));

	    _this.state = _this.getInitialState();
	    return _this;
	  }

	  _createClass(Challenger, [{
	    key: 'getInitialState',
	    value: function getInitialState() {
	      var randomSecret = new Uint8Array(32);
	      crypto.getRandomValues(randomSecret);
	      var serverKeyPair = _dotpCrypt2.default.getKeyPair(randomSecret);
	      var recPublicId = this.props.routeParams.keyId;
	      var otp = this._getRandomOTP(9);
	      var challenge = _dotpCrypt2.default.createChallenge(new Buffer(otp), serverKeyPair, recPublicId);
	      return {
	        recipient: recPublicId,
	        challenge: challenge,
	        otp: otp,
	        response: '',
	        serverKeyPair: serverKeyPair,
	        success: false
	      };
	    }
	  }, {
	    key: '_getRandomOTP',
	    value: function _getRandomOTP(len, digitsOnly) {
	      var randArr = new Uint8Array(len || 8);
	      window.crypto.getRandomValues(randArr);
	      var otp = '';
	      for (var i = 0; i < len; i++) {
	        otp = otp + randomUpTo(10);
	      }
	      console.log('OTP', otp);
	      return otp;
	    }
	  }, {
	    key: '_checkOTP',
	    value: function _checkOTP(val) {
	      if (this.state.otp === val.replace(/\s/g, '')) {
	        this.setState({ success: true });
	      } else {
	        this.setState({ success: false });
	      }
	    }
	  }, {
	    key: '_updateResponse',
	    value: function _updateResponse(e) {
	      this.setState({ response: e.target.value });
	      this._checkOTP(e.target.value);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      console.log('Challenge:', this.state.challenge);
	      new QRCode(document.getElementsByClassName("qrcode")[0], {
	        text: this.state.challenge,
	        correctLevel: QRCode.CorrectLevel.L
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { style: containerStyle },
	        _react2.default.createElement(
	          'div',
	          { className: 'container centered' },
	          _react2.default.createElement(
	            'h2',
	            null,
	            'Challenge'
	          ),
	          _react2.default.createElement('div', { className: 'qrcode' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'container align-left' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-md-6 col-md-offset-3' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  null,
	                  'Response'
	                ),
	                _react2.default.createElement('input', { type: 'text', className: this.state.success ? "form-control success" : "form-control", id: 'otp', placeholder: 'One Time Password', onChange: this._updateResponse.bind(this), value: this.state.response })
	              ),
	              _react2.default.createElement(
	                'h4',
	                null,
	                'Nitty Gritty'
	              ),
	              _react2.default.createElement(
	                'table',
	                { className: 'table' },
	                _react2.default.createElement(
	                  'tbody',
	                  null,
	                  _react2.default.createElement(
	                    'tr',
	                    null,
	                    _react2.default.createElement(
	                      'td',
	                      null,
	                      _react2.default.createElement(
	                        'strong',
	                        null,
	                        'PublicKey:'
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'td',
	                      null,
	                      this.state.recipient
	                    )
	                  ),
	                  _react2.default.createElement(
	                    'tr',
	                    null,
	                    _react2.default.createElement(
	                      'td',
	                      null,
	                      _react2.default.createElement(
	                        'strong',
	                        null,
	                        'Server Public Key: '
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'td',
	                      null,
	                      _dotpCrypt2.default.utils.Base58.encode(this.state.serverKeyPair.publicKey)
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Challenger;
	}(_react2.default.Component);

	exports.default = Challenger;

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(490); if (makeExportsHot(module, __webpack_require__(258))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Challenger.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(195)(module), __webpack_require__(494).Buffer))

/***/ }

})