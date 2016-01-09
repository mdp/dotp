import React from 'react';

import KeyStore from '../stores/KeyStore';
import dotpCrypt from 'dotp-crypt';

const SeedCharSet = '023456789abcdefghjkmnpqrstuvwxyz'
const SeedLen = 32 // 5*32=160 bit of entropy

const containerStyle = {
  margin: '0 auto',
  padding: '1em 0.5em',
};

class ImportKey extends React.Component {

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
      seed: '',
      name: '',
      keys: [],
    };
  }

  _updateName(e) {
    this.setState({name: e.target.value})
  }

  _updateSeed(e) {
    let value = e.target.value
    value = value.toUpperCase().replace(/\s/g, '').match(/.{1,4}/g).join(' ').trim()
    this.setState({seed: value})
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
        <input type='text' placeholder='Seed' value={this.state.seed} onChange={this._updateSeed.bind(this)}/>
        <button className="btn btn-positive btn-block" onClick={()=>this._handleAddKey()}>
          <span className="icon icon-plus"></span>
          Import
        </button>
      </div>
    );
  }
}

export default ImportKey;
