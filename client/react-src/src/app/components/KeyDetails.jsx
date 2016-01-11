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
      text:this.state.key.get('publicID'),
      correctLevel : QRCode.CorrectLevel.M,
    })
  }

  _deleteKey() {
    if (confirm("Are you absolutely sure you want to delete this key?")) {
      KeyStore.destroy(this.state.key.get('publicID'))
      this.props.history.goBack()
    }
  }

  _edit() {
    this.props.history.pushState(null, `${this.state.key.get('publicID')}/edit`)
  }

  render() {
    console.log('Details Render', this.state.key.get('publicID'))
    return (
      <div style={containerStyle}>
        <div className='qrcode-container'> <div className='qrcode' />
        <h3>{this.state.key.pretty()}</h3>
        <table className="table details">
          <tbody>
            <tr>
              <td>Public ID:</td>
              <td>{this.state.key.get('publicID').match(/.{1,10}/g).join(' ')}</td>
            </tr>
            <tr>
              <td>Created At:</td>
              <td>{new Date(this.state.key.get('createdAt')).toString()}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <button className="btn btn-negative btn-block" onTouchTap={()=> this._deleteKey()}>
          <span className="icon icon-trash"></span>
          Delete
        </button>
        <button className="btn btn-positive btn-block" onTouchTap={()=> this._edit()}>
          <span className="icon icon-edit"></span>
          Edit
        </button>
      </div>
    );
  }
}

export default KeyDetails;
