import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

class Graph extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    title: 'City',
    height: 300,
    width: 600,
    label: 'Graph',
  };

  state = { chartData: {} };

  componentWillMount() {
    this.createData();
  }

  createData = async () => {
    const { chartData, label } = this.props;

    const data = [];
    const labels = [];
    chartData.map(item => {
      data.push(item.count);
      labels.push(item.course.title);
      console.log(item);
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
    await this.setState({ chartData: { ...newData } });
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
    const { chartData } = this.state;
    console.log('state', this.state);
    return (
      <>
        {this.props.graph === 'bar' && (
          <Bar
            data={chartData}
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
        )}
        {this.props.graph === 'line' && (
          <Line
            data={chartData}
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
        )}
      </>
    );
  }
}

Graph.propTypes = {
  chartData: PropTypes.array.isRequired,
  displayTitle: PropTypes.string,
  location: PropTypes.string,
  displayLegend: PropTypes.string,
  legendPosition: PropTypes.string,
};

export default Graph;
