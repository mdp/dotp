import React from 'react';

let QRCode = require("../lib/qrcode.js");

import dotpCrypt from 'dotp-crypt';

const containerStyle = {
  margin: '0 0',
  padding: '1em 0.5em',
};

// This would normally all by done on the server, but for demonstration
// purposes we are doing it all client side

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


class OpenInAppButton extends React.Component {
  isMobile() {
    return /Mobi/.test(navigator.userAgent)
  }

  render() {
    console.log(this.props)
    if (this.isMobile()) {
      return <h5><a href={'https://dauth.atrailing.space/' + this.props.challenge}>Open in App</a></h5>
    }
    return false
  }
}

class Challenger extends React.Component {

  constructor (p, c) {
    super(p, c)
    this.state = this.fetchInitialState()
  }

  fetchInitialState() {
    console.log('RouteId', this.props.routeParams.keyId)
    let serverName = window.location.origin
    let ephemeralKey = new Uint8Array(32)
    crypto.getRandomValues(ephemeralKey)
    let recPublicId = this.props.routeParams.keyId
    let otp = this._getRandomOTP(9)
    let challenge = dotpCrypt.createChallenge(otp, recPublicId, serverName, ephemeralKey)
    return {
      recipient: recPublicId,
      challenge: challenge,
      otp: otp,
      response: '',
      success: false,
    };
  }

  _getRandomOTP(len, digitsOnly) {
    let randArr = new Uint8Array(len || 8)
    window.crypto.getRandomValues(randArr)
    let otp = ''
    for (let i=0; i < len; i++) {
      otp = otp + (randomUpTo(10))
    }
    console.log('OTP', otp)
    return otp
  }

  _checkOTP(val) {
    if (this.state.otp === val.replace(/\s/g,'')) {
      this.setState({success: true})
    } else {
      this.setState({success: false})
    }
  }

  _updateResponse(e) {
    this.setState({response: e.target.value})
    this._checkOTP(e.target.value)
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
          <h2>Challenge QR Code</h2>
          <div className='qrcode' />
          <OpenInAppButton challenge={this.state.challenge}/>
        </div>
        <div className='container align-left'>
          <div className='row'>
            <div className='col-md-6 col-md-offset-3'>
                <div className="form-group">
                  <label>Response</label>
                  <input type="text" className={this.state.success ? "form-control success" :"form-control"} id="otp" placeholder="One Time Password" onChange={this._updateResponse.bind(this)} value={this.state.response} />
                </div>
              <h4>Nitty Gritty</h4>
              <table className='table'>
                <tbody>
                  <tr><td><strong>PublicKey:</strong></td><td>{this.state.recipient}</td></tr>
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
