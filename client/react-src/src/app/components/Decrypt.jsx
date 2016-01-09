import React from 'react';

let QRCode = require("../lib/qrcode.js");

import KeyStore from '../stores/KeyStore';
import dotpCrypt from 'dotp-crypt';

const containerStyle = {
  margin: '0 auto',
  padding: '1em 0.5em',
};

class Decrypt extends React.Component {

  static cancelable = true

  constructor (p, c) {
    super(p, c)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      challenge: this.props.routeParams.challenge,
      result: KeyStore.decryptChallenge(this.props.routeParams.challenge),
    };
  }

  render() {
    return (
      <div style={containerStyle}>
        <div className='monospace'>OTP: {this.state.result.otp}</div>
        <div className='monospace'>Key: {this.state.result.key.hash()}</div>
      </div>
    );
  }
}

export default Decrypt;
