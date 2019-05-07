/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import SimpleUser from '../Authentication/SimpleUser';

class Inner extends Component {
  render() {
    const { data } = this.props;
    const newData = {
      labels: ['Red', 'Green', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
    return <Bar data={newData} />;
  }
}

class Stats extends Component {
  render() {
    return (
      <SimpleUser>
        {({
          data: {
            me: { videoUser },
          },
        }) => (
          <div>
            <Inner data={videoUser} />
          </div>
        )}
      </SimpleUser>
    );
  }
}

Stats.propTypes = {};
Inner.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Stats;
