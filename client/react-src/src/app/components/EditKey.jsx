import React from 'react';

import KeyStore from '../stores/KeyStore';
import dotpCrypt from 'dotp-crypt';

const containerStyle = {
  margin: '0 auto',
  padding: '1em 0.5em',
};

class EditKey extends React.Component {

  static cancelable = true

  constructor (p, c) {
    super(p, c)
    this.state = this.getInitialState()
  }

  getInitialState() {
    let key = KeyStore.get(this.props.routeParams.keyId)
    let name = key.get('name')
    return {
      key: key,
      name: name,
    };
  }

  _updateName(e) {
    this.setState({name: e.target.value})
  }

  _handleAddKey() {
    KeyStore.create(this.state.key.get('secretKey'), this.state.name)
    this.props.history.pushState(null, `/${this.state.key.get('publicID')}`)
  }

  render() {
    return (
      <div style={containerStyle}>
        <input type='text' className='form-control' placeholder='Key Name' value={this.state.name} onChange={this._updateName.bind(this)}/>
        <button className="btn btn-positive btn-block" onClick={()=>this._handleAddKey()}>
          <span className="icon"></span>
          Update Key
        </button>
      </div>
    );
  }
}

export default EditKey;
