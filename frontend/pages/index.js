import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserActions from '../client/actions/user';

class Index extends Component {
  static async getInitialProps(ctx) {
    const { store } = ctx;
    const userId = 1;

    const user = await store.dispatch(UserActions.get(userId, ctx));

    return {
      user,
      meta: {
        title: 'project-name',
        description:
          'This is an example of a meta description for project-name page.',
      },
    };
  }

  static propTypes = {
    /**
     * Current information of the user, if logged in
     */
    user: PropTypes.object,
    /**
     * Function that get user based on id
     */
    getUser: PropTypes.func,
    /**
     * Meta attributes, e.g. title, description etc.
     */
    meta: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <p>Home</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Index);
