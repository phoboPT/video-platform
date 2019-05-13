import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Videos from '../components/InstructorArea/MyVideos/Videos';

class videos extends Component {
  render() {
    const { query } = this.props;
    return (
      <div>
        <Videos page={parseFloat(query.page) || 1} />
      </div>
    );
  }
}

videos.propTypes = {
  query: PropTypes.number.isRequired,
};

export default videos;
