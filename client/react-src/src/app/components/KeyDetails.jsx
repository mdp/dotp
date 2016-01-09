import React from 'react';

let QRCode = require("../lib/qrcode.js");

import KeyStore from '../stores/KeyStore';
import dotpCrypt from 'dotp-crypt';

const containerStyle = {
  margin: '0 auto',
  width: '100%',
  padding: '2em 1em',
};

class KeyDetails extends React.Component {

  static cancelable = true

  constructor (p, c) {
    super(p, c)
    this.state = this.getInitialState()
    console.log(this.state)
  }

  getInitialState() {
    return {
      key: KeyStore.get(this.props.routeParams.keyId),
    };
  }


  componentWillMount() {
  }

  componentDidMount() {
    console.log('QRCode Render', this.state.key)
    new QRCode(document.getElementsByClassName("qrcode")[0], {
      text:this.state.key.hash(),
      correctLevel : QRCode.CorrectLevel.L,
    })
  }

  _deleteKey() {
    if (confirm("Are you absolutely sure you want to delete this key?")) {
      KeyStore.destroy(this.state.key.hash())
      this.props.history.goBack()
    }
  }

  render() {
    console.log('Details Render', this.state.key.hash())
    return (
      <div style={containerStyle}>
        <div className='qrcode-container'> <div className='qrcode' />
        <div className='monospace'>{this.state.key.hash().match(/.{1,15}/g).join(' ')}</div>
        </div>
        <button className="btn btn-negative btn-block" onClick={()=> this._deleteKey()}>
          <span className="icon icon-trash"></span>
          Delete
        </button>
        <button className="btn btn-positive btn-block">
          <span className="icon icon-edit"></span>
          Edit
        </button>
      </div>
    );
  }
}

export default KeyDetails;
