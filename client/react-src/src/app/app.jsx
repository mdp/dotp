import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main'; // Our custom react component
import KeyDetails from './components/KeyDetails'; // Our custom react component
import KeyList from './components/KeyList'; // Our custom react component
import NewKey from './components/NewKey'; // Our custom react component
import ImportKey from './components/ImportKey'; // Our custom react component
import Scan from './components/Scan'; // Our custom react component
import Decrypt from './components/Decrypt'; // Our custom react component

import KeyStore from './stores/KeyStore'
import DotpCrypt from 'dotp-crypt'

window.dotp = {
  KeyStore: KeyStore,
  DotpCrypt: DotpCrypt,
}

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route component={Main}>
      <Route path='/add' component={NewKey} />
      <Route path='/import' component={ImportKey} />
      <Route path='/scan' component={Scan} />
      <Route path='/decrypt/:challenge' component={Decrypt} />
      <Route path='/:keyId' component={KeyDetails} />
      <Route path='/' component={KeyList} />
    </Route>
  </Router>
), document.getElementById('app'))
