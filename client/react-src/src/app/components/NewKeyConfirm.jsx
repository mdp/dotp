import React from 'react';

import KeyStore from '../stores/KeyStore';
import dotpCrypt from 'dotp-crypt';

const SeedCharSet = '023456789abcdefghjkmnpqrstuvwxyz'
const SeedLen = 32 // 5*32=160 bit of entropy

const containerStyle = {
  margin: '0 auto',
  padding: '1em 0.5em',
};

class NewKeyConfirm extends React.Component {

  static cancelable = true

  constructor (p, c) {
    super(p, c)
    this.state = this.getInitialState()
  }

  getInitialState() {
    let seed = this.props.routeParams.seed.match(/.{1,4}/g).join(' ')
    return {
      seed: seed,
    };
  }

  _done() {
    this.props.history.pushState(null, '/')
  }

  render() {
    return (
      <div style={containerStyle}>
        <h3 style={{marginLeft:'1em'}}>Backup Key</h3>
        <div className='section'>
          <p className='monospace'>{this.state.seed}</p>
        </div>
        <p style={{margin: '0 2em 2em 2em', fontWeight:'bold', color: '#CC3333'}}>Write down this backup key, it's the only way to recover a dOTP key if you lose access to your phone or accidentally delete the keypair!</p>
        <button className="btn btn-positive btn-block" onClick={()=>this._done()}>
        <span className="icon"></span>
        OK, I got it!
        </button>
      </div>
    );
  }
}

export default NewKeyConfirm;
