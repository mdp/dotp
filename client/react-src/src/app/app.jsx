import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main';
import KeyDetails from './components/KeyDetails';
import KeyList from './components/KeyList';
import NewKey from './components/NewKey';
import EditKey from './components/EditKey';
import NewKeyConfirm from './components/NewKeyConfirm';
import ImportKey from './components/ImportKey';
import Scan from './components/Scan';
import Decrypt from './components/Decrypt';

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
      <Route path='/add/confirm/:seed' component={NewKeyConfirm} />
      <Route path='/add' component={NewKey} />
      <Route path='/import' component={ImportKey} />
      <Route path='/scan' component={Scan} />
      <Route path='/decrypt/:challenge' component={Decrypt} />
      <Route path='/:keyId/edit' component={EditKey} />
      <Route path='/:keyId' component={KeyDetails} />
      <Route path='/' component={KeyList} />
    </Route>
  </Router>
), document.getElementById('app'))
