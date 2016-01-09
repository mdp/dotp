import React from 'react';

const containerStyle = {
};

class Scan extends React.Component {

  static cancelable = true

  constructor (p, c) {
    super(p, c)
    this.state = this.getInitialState()
    console.log(window)
    console.log(window.cordova)
  }

  getInitialState() {
    return {
    };
  }

  _decrypt(challenge) {
    this.props.history.pushState(null, '/decrypt/'+challenge);
  }

  scan() {
    if (window.cordova) {
      window.cordova.plugins.barcodeScanner.scan((result) => {
        this._decrypt(result.text)
      }, (error) => {
        alert("Scanning failed: " + error)
      })
    }
  }

  render() {
    this.scan()
    return (
      <div style={containerStyle}>
        Scanning not supported on this device
      </div>
    );
  }
}

export default Scan;
