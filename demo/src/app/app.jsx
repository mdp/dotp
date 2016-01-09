import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main'; // Our custom react component
import Challenger from './components/Challenger'; // Our custom react component
import Login from './components/Login'; // Our custom react component

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

function forceSSL() {
  if (window.location.href.indexOf('http:') === 0) {
    window.location = window.location.href.replace(/^http\:/, 'https:')
  }
}
forceSSL()

ReactDOM.render((
  <Router history={browserHistory}>
    <Route component={Main}>
      <Route path='/:keyId' component={Challenger} />
      <Route path='/' component={Login} />
    </Route>
  </Router>
), document.getElementById('app'))
