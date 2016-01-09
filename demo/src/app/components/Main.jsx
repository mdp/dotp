import React from 'react';
import Dialog from 'material-ui/lib/dialog';

const Main = React.createClass({

  contextTypes: {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  },

  getInitialState() {
    console.log(this.props)
    return {
    };
  },

  render() {
    return (
      <div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default Main;
