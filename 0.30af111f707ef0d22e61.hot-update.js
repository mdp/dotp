webpackHotUpdate(0,{

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(196), RootInstanceProvider = __webpack_require__(204), ReactMount = __webpack_require__(206), React = __webpack_require__(258); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

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

	var containerStyle = {
	  margin: '0 0',
	  padding: '1em 0.5em'
	};

	var Login = function (_React$Component) {
	  _inherits(Login, _React$Component);

	  function Login(p, c) {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, p, c));

	    _this.state = _this.getInitialState();
	    return _this;
	  }

	  _createClass(Login, [{
	    key: 'getInitialState',
	    value: function getInitialState() {
	      var returnHref = window.location.origin + window.location.pathname + '#/?';
	      var scanHref = window.location.origin + window.location.pathname.replace('/demo/', '/scan/?redir=' + encodeURIComponent(returnHref));
	      return {
	        publicID: '',
	        returnHref: scanHref,
	        error: ''
	      };
	    }
	  }, {
	    key: '_updatePublicID',
	    value: function _updatePublicID(e) {
	      this.setState({ publicID: e.target.value });
	    }
	  }, {
	    key: '_login',
	    value: function _login(e) {
	      e.preventDefault();
	      try {
	        _dotpCrypt2.default.getPublicKeyFromPublicID(this.state.publicID);
	        this.setState({ error: '' });
	        this.props.history.pushState(null, '/' + this.state.publicID);
	      } catch (e) {
	        this.setState({ error: e.message });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log(this.state);
	      return _react2.default.createElement(
	        'div',
	        { style: containerStyle },
	        _react2.default.createElement(
	          'div',
	          { className: 'container align-left' },
	          _react2.default.createElement(
	            'form',
	            { onSubmit: this._login.bind(this) },
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                null,
	                'Public Key'
	              ),
	              ' ',
	              _react2.default.createElement(
	                'a',
	                { href: this.state.returnHref },
	                'Or scan your public key from your phone'
	              ),
	              _react2.default.createElement('input', { type: 'text', className: this.state.success ? "form-control success" : "form-control", id: 'otp', placeholder: 'Public ID', onChange: this._updatePublicID.bind(this), value: this.state.publicID })
	            ),
	            _react2.default.createElement(
	              'button',
	              { type: 'submit', className: 'btn btn-default' },
	              'Login'
	            ),
	            _react2.default.createElement(
	              'p',
	              { 'class': 'error' },
	              this.state.error
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Login;
	}(_react2.default.Component);

	exports.default = Login;

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(490); if (makeExportsHot(module, __webpack_require__(258))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Login.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(195)(module)))

/***/ }

})