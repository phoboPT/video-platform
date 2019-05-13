/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import formatDate from '../../../lib/formatDate';

class AllCourses extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    title: 'City',
    height: 300,
    width: 600,
    label: 'Graph',
  };

  state = {
    totalCourses: {},
  };

  componentWillMount() {
    const { chartData } = this.props;

    if (chartData.coursesStats) {
      this.createData();
    }
  }

  createData = async () => {
    const { chartData, label } = this.props;
    const data = [];
    const labels = [];

    let initial = formatDate(chartData.coursesStats[0].createdAt).splice(0, 1);
    initial = initial[0];

    chartData.coursesStats.map((item, index) => {
      data.push(item.count);
      labels.push(item.course.title);
    });
    data.push(6);
    data.push(0);
    const newData = {
      labels: [...labels],

      datasets: [
        {
          label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [...data],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    await this.setState({
      totalCourses: { ...newData },
    });
  };

  render() {
    const {
      displayTitle,
      location,
      displayLegend,
      legendPosition,
      width,
      height,
    } = this.props;
    const { totalCourses } = this.state;
    return (
      <Bar
        data={totalCourses}
        width={width}
        height={height}
        options={{
          title: {
            display: displayTitle,
            text: `${location}`,
            fontSize: 25,
          },
          legend: {
            display: displayLegend,
            position: legendPosition,
          },

          maintainAspectRatio: false,
        }}
      />
    );
  }
}

AllCourses.propTypes = {
  chartData: PropTypes.object,
  displayTitle: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  displayLegend: PropTypes.bool,
  legendPosition: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  label: PropTypes.string,
};

export default AllCourses;
