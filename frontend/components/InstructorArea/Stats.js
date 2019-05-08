/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import StatsInstrutor from '../Authentication/StatsInstrutor';
import Graph from './Graph';

class Stats extends Component {
  render() {
    return (
      <StatsInstrutor>
        {({ data: { coursesStats } }) => (
          <>
            {console.log('course!', coursesStats)}
            <div>
              <Graph
                chartData={coursesStats}
                location="All Courses"
                legendPosition="top"
                displayTitle="Hello"
                label="Total Courses Selled"
                width={700}
                height={400}
                graph="bar"
              />
              <Graph
                chartData={coursesStats}
                location="All Courses"
                legendPosition="top"
                displayTitle="Hello"
                label="Total Courses Selled"
                width={700}
                height={400}
                graph="line"
              />
            </div>
          </>
        )}
      </StatsInstrutor>
    );
  }
}

export default Stats;
