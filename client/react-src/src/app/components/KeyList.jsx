import React from 'react';
import {Link} from 'react-router'

let QRCode = require("../lib/qrcode.js");

import KeyStore from '../stores/KeyStore';
import dotpCrypt from 'dotp-crypt';

const containerStyle = {
};

class KeyList extends React.Component {

  static bottomBar = true

  static contextTypes= {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  }

  constructor (p, c) {
    super(p, c)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      keys: [],
    };
  }

  componentDidMount() {
    this._updateKeys()
  }

  _updateKeys() {
    let keys = KeyStore.getAll()
    this.setState({keys: keys})
  }

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  _openKey(id) {
    this.props.history.pushState(null, '/'+id);
  }

  _handleAddKey() {
    this.props.history.pushState(null, '/add');
  }

  _scan() {
    if (window.cordova) {
      window.cordova.plugins.barcodeScanner.scan((result) => {
        if (result.text && result.text.length > 0) {
          this.props.history.pushState(null, '/decrypt/'+result.text);
        }
      }, (error) => {
        alert("Scanning failed: " + error)
      })
    } else {
      alert('Scanning not supported on this device')
    }
  }

  render() {
    return (
        <div>
          <table className="table">
          <tbody>
          {
            this.state.keys.map((key) => {
            return(
                <tr onTouchTap={()=> this._openKey(key.get('publicID'))} key={key.get('publicID')} >
                  <td>
                    <div>{key.pretty()}</div>
                    <div className='monospace' style={{color:'#555', fontSize: '0.8em'}}>{key.get('publicID').substr(0,15)}</div>
                  </td>
                </tr>
            )
            })
          }
            <tr onTouchTap={()=> this._handleAddKey()} >
              <td>
                <div style={{color:'#4527A0', margin:'0.35em 0 0 0.05em'}}>Add a new key</div>
              </td>
            </tr>
          </tbody>
          </table>
          <div className="md-floating-btn" onClick={()=>this._scan()}>
            <span className='icon glyphicon glyphicon-qrcode'/>
          </div>
        </div>
    );
  }
}

KeyList.childContextTypes = {muiTheme: React.PropTypes.object};


export default KeyList;
