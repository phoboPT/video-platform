import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Video from '../client/components/Video';

class About extends Component {
  static async getInitialProps() {
    return {
      meta: {
        title: 'About',
        description: 'This is an example of a meta description for about page.',
      },
    };
  }

  static propTypes = {
    /**
     * Meta attributes, e.g. title, description etc.
     */
    meta: PropTypes.object.isRequired,
  };

  render() {
    return <Video />;
  }
}

export default About;
