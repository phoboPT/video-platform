/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import formatDate from '../../../lib/formatDate';

class CourseByDate extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    height: 300,
    width: 600,
  };

  state = {
    totalCourses: {},
    defaultData: {
      labels: ['Zero', 'Ten'],

      datasets: [
        {
          label: 'Default',
          fill: true,
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
          data: [0, 0, 10],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
  };

  componentWillMount() {
    const { chartData } = this.props;
    if (chartData.coursesStatsByDate.length > 0) {
      this.createData();
      this.setState({
        title: chartData.coursesStatsByDate[0].course.title,
      });
    }
  }

  createData = async () => {
    const { chartData } = this.props;
    const data = [];
    const labels = [];

    let initial = formatDate(chartData.coursesStatsByDate[0].createdAt).splice(
      0,
      1
    );
    initial = initial[0];

    chartData.coursesStatsByDate.map(item => {
      let date = formatDate(item.createdAt);
      date = date[0];
      data.push(item.count);
      labels.push(formatDate(item.createdAt));
    });
    data.push(6);
    data.push(0);
    const newData = {
      labels: [...labels],

      datasets: [
        {
          label: chartData.coursesStatsByDate[0].course.title,
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
      width,
      height,
      displayLegend,
      legendPosition,
      empty,
    } = this.props;
    const { totalCourses, title, defaultData } = this.state;
    if (empty) {
      return (
        <Bar
          data={defaultData}
          width={width}
          height={height}
          options={{
            title: {
              display: displayTitle,
              text: 'No Data Yet',
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
    return (
      <Bar
        data={totalCourses}
        width={width}
        height={height}
        options={{
          title: {
            display: displayTitle,
            text: title,
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

CourseByDate.propTypes = {
  chartData: PropTypes.object,
  displayTitle: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  displayLegend: PropTypes.bool,
  legendPosition: PropTypes.string,
  empty: PropTypes.bool,
};

export default CourseByDate;
