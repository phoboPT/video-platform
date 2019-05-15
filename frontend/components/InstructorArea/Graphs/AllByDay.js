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
    title: 'All Stats',
  };

  state = {
    totalCourses: {},
    options: {
      title: {
        display: this.props.displayTitle,
        text: this.props.title,
        fontSize: 25,
      },
      legend: {
        display: this.props.displayLegend,
        position: this.props.legendPosition,
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
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
        title: 'All Stats',
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
      labels.push(item.course.title);
    });
    const newData = {
      labels: [...labels],

      datasets: [
        {
          label: 'All Stats',
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
    const { totalCourses, title, defaultData, options } = this.state;
    if (empty) {
      return (
        <Bar
          data={defaultData}
          width={width}
          height={height}
          options={options}
        />
      );
    }
    return (
      <Bar
        data={totalCourses}
        width={width}
        height={height}
        options={options}
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
  title: PropTypes.string.isRequired,
};

export default CourseByDate;
