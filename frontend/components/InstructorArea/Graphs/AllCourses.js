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
    title: 'All',
    height: 300,
    width: 600,
    label: 'Graph',
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
    const { width, height } = this.props;
    const { totalCourses, options } = this.state;
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
