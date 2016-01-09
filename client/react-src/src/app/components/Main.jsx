import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import KeyList from './KeyList'
import {Link} from 'react-router'

const navBarStyle = {
  backgroundColor:'#9C27B0',
  color: '#EEEEEE',
};

const contentStyle = {
   marginTop:'4em',
};

const Main = React.createClass({

  contextTypes: {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  },

  getInitialState() {
    return {
      platform: this._devicePlatform(),
    };
  },

  _devicePlatform() {
    if (window.cordova && cordova.platformId) {
      return cordova.platformId
    }
    return null
  },

  componentWillMount() {
  },

  leftNavBtn() {
    console.log('Context', this.context)
    if (this.props.routes[this.props.routes.length-1].component.cancelable) {
      return(
        <div className={'back ' + this.state.platform} onTouchTap={()=>{
          if (this.props.history.length >= 1) {
            this.props.history.goBack()
          } else {
            this.props.history.replaceState(null, '/');
          }
        }}>Back</div>
      )
    }
  },

  render() {
    return (
      <div>
        <nav className={'fixed-nav ' + this.state.platform}>
          {this.leftNavBtn()}
          <div className={'title ' + this.state.platform}>dOTP</div>
        </nav>
        <div className={'content ' + this.state.platform}>
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default Main;
