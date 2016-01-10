import React from 'react';
import dotpCrypt from 'dotp-crypt';

const containerStyle = {
  margin: '0 0',
  padding: '1em 0.5em',
};


class Login extends React.Component {

  constructor (p, c) {
    super(p, c)
    this.state = this.getInitialState()
  }

  getInitialState() {
    let returnHref = window.location.origin + window.location.pathname + '#/?'
    let scanHref = window.location.origin + window.location.pathname.replace('/demo/','/scan/?redir='+encodeURIComponent(returnHref))
    return {
      publicID: '',
      returnHref: scanHref,
      error: '',
    };
  }

  _updatePublicID(e) {
    this.setState({publicID: e.target.value})
  }

  _login(e) {
    e.preventDefault()
    try {
      dotpCrypt.getPublicKeyFromPublicID(this.state.publicID)
      this.setState({error: ''})
      this.props.history.pushState(null, `/${this.state.publicID}`)
    } catch (e) {
      this.setState({error: e.message})
    }
  }

  componentDidMount() {
  }

  render() {
    console.log(this.state)
    return (
      <div style={containerStyle}>
        <div className='container align-left'>
          <p class='error'>{this.state.error}</p>
          <form onSubmit={this._login.bind(this)}>
            <div className="form-group">
              <label>Public Key</label> <a href={this.state.returnHref}>Or scan your public key from your phone</a>
              <input type="text" className={this.state.success ? "form-control success" :"form-control"} id="otp" placeholder="Public ID" onChange={this._updatePublicID.bind(this)} value={this.state.publicID} />
            </div>
            <button type="submit" className="btn btn-default">Login</button>
          </form>

        </div>
      </div>
    );
  }
}

export default Login;
