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
    sellByDate: {},
  };

  componentWillMount() {
    this.createData();
  }

  createData = async () => {
    const { chartData, label } = this.props;
    const data = [];
    const labels = [];
    let dateData = 0;

    let initial = formatDate(chartData.coursesStats[0].createdAt).splice(0, 1);
    initial = initial[0];

    chartData.coursesStats.map((item, index) => {
      let date = formatDate(item.createdAt);
      date = date[0];
      data.push(item.count);
      labels.push(item.course.title);
      if (date === initial) {
        dateData += item.count;
      }
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
    const sellData = {
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
          data: [dateData],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
    await this.setState({
      totalCourses: { ...newData },
      sellByDate: { ...sellData },
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
      id,
    } = this.props;
    const { totalCourses, sellByDate } = this.state;
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

          maintainAspectRatio: false,
        }}
      />
    );
  }
}

AllCourses.propTypes = {
  chartData: PropTypes.array.isRequired,
  displayTitle: PropTypes.string,
  location: PropTypes.string,
  displayLegend: PropTypes.string,
  legendPosition: PropTypes.string,
};

export default AllCourses;
