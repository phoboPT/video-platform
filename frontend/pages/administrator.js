import React from 'react';
import User from '../components/Authentication/User';
import AdminMenu from '../components/Admin/AdminMenu';

const Administrator = props => (
  <User>
    {({ data: { me }, loading, error }) => {
      if (loading) {
        return null;
      }
      if (!me) return <p>You can't be here</p>;
      if (me.permission[0] === 'ADMIN') {
        return (
          <div>
            <AdminMenu />
          </div>
        );
      }
      return <p>You can't be here</p>;
    }}
  </User>
);

export default Administrator;
