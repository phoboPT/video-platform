import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default React.createClass({
  displayName: 'BubbleExample',
  render() {
    const { data } = this.props;
    const newData = {
      labels: ['Red', 'Green', 'Yellow'],
      datasets: [
        {
          data: [140, 110, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
    return (
      <Bar
        data={newData}
        width={150}
        height={650}
        options={{ maintainAspectRatio: false }}
        displayName="hi"
      />
    );
  },
});
