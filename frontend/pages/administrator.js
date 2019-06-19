import React, { Component } from 'react';
import User from '../components/Authentication/User';

export class administrator extends Component {
  render() {
    return (
      <User>
        {({ data: { me }, loading, error }) => {
          if (loading) {
            return null;
          }
          if (!me) return <p>You can't be here</p>;
          if (me.permission[0] === 'ADMIN') {
            return (
              <div>
                <p>admin</p>
              </div>
            );
          }
          return <p>You can't be here</p>;
        }}
      </User>
    );
  }
}

export default administrator;
