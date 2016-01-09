import React from 'react';

import KeyStore from '../stores/KeyStore';
import dotpCrypt from 'dotp-crypt';

const SeedCharSet = '023456789abcdefghjkmnpqrstuvwxyz'
const SeedLen = 32 // 5*32=160 bit of entropy

const containerStyle = {
  margin: '0 auto',
  padding: '1em 0.5em',
};

class NewKey extends React.Component {

  static cancelable = true

  constructor (p, c) {
    super(p, c)
    this.state = this.getInitialState()
  }

  _createRandomSeed() {
    let seed = ''
    let randArr = new Uint8Array(SeedLen)
    window.crypto.getRandomValues(randArr)
    for (let i=0; i < SeedLen; i++) {
      if (i > 0 && i % 4 === 0) seed = seed + ' '
      seed = seed + SeedCharSet.substr(randArr[i]%32,1)
    }
    return seed.toUpperCase()
  }

  getInitialState() {
    return {
      seed: this._createRandomSeed(),
      name: '',
      keys: [],
    };
  }

  _updateName(e) {
    this.setState({name: e.target.value})
  }

  _handleAddKey() {
    let seed = this.state.seed.replace(/[^a-zA-Z0-9]/,'')
    let privateKey = dotpCrypt.nacl.hash(new Buffer(seed))
    privateKey = privateKey.subarray(0,32)
    KeyStore.create(privateKey, this.state.name)
    this.props.history.pushState(null, '/')
  }

  render() {
    return (
      <div style={containerStyle}>
        <input type='text' placeholder='Name' value={this.state.name} onChange={this._updateName.bind(this)}/>
        <div className='monospace'>{this.state.seed}</div>
        <button className="btn btn-positive btn-block" onClick={()=>this._handleAddKey()}>
          <span className="icon"></span>
          Create
        </button>
        <button className="btn btn-positive btn-block" onClick={()=> this.props.history.pushState(null, '/import')}>
          <span className="icon"></span>
          Import From Seed
        </button>
      </div>
    );
  }
}

export default NewKey;
