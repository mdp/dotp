import React from 'react';

let QRCode = require("../lib/qrcode.js");

import dotpCrypt from 'dotp-crypt';

const containerStyle = {
  margin: '0 0',
  padding: '1em 0.5em',
};

// This would normally all by done on the server, but for demonstration
// purposes we are doing it all client side
const ServerSecret = new Buffer('This is the seed for the server secret key')
const ServerPrivateKey = dotpCrypt.nacl.hash(ServerSecret).subarray(0,32)
const ServerKeyPair = dotpCrypt.getKeyPair(ServerPrivateKey)
const OTPCharSet = '023456789abcdefghjkmnpqrstuvwxyz'


function randomUpTo(k, r, s) {
  let uint8 = new Uint8Array(1)
  uint8 = window.crypto.getRandomValues(uint8)[0]
  let n = 256
  let x = uint8
  r = r || 0;
  s = s || 1;
  r = r * n + x;
  s = s * n;
  if (r >= (s/k) * k) {
    r = s/k; s = s - (s/k) * k
      randomUpTo(k, r, s)
  } else {
    return r % k
  }
}

class Challenger extends React.Component {

  static cancelable = true

  constructor (p, c) {
    super(p, c)
    console.log(this.props)
    this.state = this.getInitialState()
    console.log(this.state)
  }

  getInitialState() {
    let recPublicId = this.props.routeParams.keyId
    let nonce = new Uint8Array(24); window.crypto.getRandomValues(nonce);
    let expiresAt = Math.floor(Date.now()/1000) + 360
    let otp = this._getRandomOTP(10)
    let challenge = dotpCrypt.createChallenge(new Buffer(otp), nonce, expiresAt, ServerKeyPair, recPublicId)
    return {
      recipient: recPublicId,
      nonce: nonce,
      expiresAt: expiresAt,
      challenge: challenge,
      otp: otp,
      response: null,
      serverKeyPair: ServerKeyPair,
      success: false,
    };
  }

  _getRandomOTP(len, digitsOnly) {
    let randArr = new Uint8Array(len || 8)
    window.crypto.getRandomValues(randArr)
    let otp = ''
    for (let i=0; i < len; i++) {
      otp = otp + (randomUpTo(10))
      //otp = otp + OTPCharSet.substr(randArr[i]%32,1)
    }
    console.log('OTP', otp)
    return otp
  }

  _checkOTP(e) {
    e.preventDefault()
    if (this.state.otp === this.state.response) {
      this.setState({success: true})
    }
    console.log(this.state)
  }

  _updateResponse(e) {
    this.setState({response: e.target.value})
  }

  componentDidMount() {
    console.log('Challenge:', this.state.challenge)
    new QRCode(document.getElementsByClassName("qrcode")[0], {
      text: this.state.challenge,
      correctLevel : QRCode.CorrectLevel.L,
    })
  }

  render() {
    return (
      <div style={containerStyle}>
        <div className='container centered'>
          <div className='qrcode' />
        </div>
        <div className='container align-left'>
          <div className='row'>
            <div className='col-md-6 col-md-offset-3'>
              <form onSubmit={this._checkOTP.bind(this)}>
                <div className="form-group">
                  <label>One Time Password</label>
                  <input type="text" className={this.state.success ? "form-control success" :"form-control"} id="otp" placeholder="One Time Password" onChange={this._updateResponse.bind(this)} value={this.state.response} />
                </div>
                <button type="submit" className="btn btn-default">Check</button>
              </form>
              <h4>Nitty Gritty</h4>
              <table className='table'>
                <tbody>
                  <tr><td><strong>PublicKey:</strong></td><td>{this.state.recipient}</td></tr>
                  <tr><td><strong>Server Public Key: </strong></td><td>{dotpCrypt.utils.Base58.encode(this.state.serverKeyPair.publicKey)}</td></tr>
                    <tr><td><strong>Nonce: </strong></td><td>{dotpCrypt.utils.Base58.encode(this.state.nonce)}</td></tr>
                    <tr><td><strong>Expires At: </strong></td><td>{new Date(this.state.expiresAt * 1000).toString()}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Challenger;
