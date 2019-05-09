import React, { Component } from 'react';
import styled from 'styled-components';
import Stats from './Stats';

const Style = styled.div`
  .graphs-container {
    display: block;
    .graphs {
      display: flex;
      .first {
        border: 1px dotted red;
        margin: 2rem;
        order: 1;
        flex: 1;
      }
      .second {
        margin: 2rem;
        order: 2;
        flex: 1;
      }
    }
  }
`;

class StatsPage extends Component {
  state = {
    courseId: 'asd',
    view: 2,
    courseId: 'cjv3zu1zj4ewf0b22ca51eeab',
    key: 0,
  };

  handleChangeCourse = e => {
    const { key } = this.state;
    this.setState({
      courseId: e.target.value,
      key: key + 1,
    });
  };

  render() {
    const { courseId, view, key } = this.state;
    const { courses } = this.props;
    console.log(courses);

    return (
      <Style>
        <label htmlFor="category">
          Category
          <select
            id="dropdownlist"
            onChange={this.handleChangeCourse}
            name="category"
            defaultValue={courses[0].course.title || 'a'}
          >
            <option value="a" disabled hidden>
              Select a Course
            </option>
            {courses.map(item => (
              <option key={item.id} value={item.course.id}>
                {item.course.title}
              </option>
            ))}
          </select>
        </label>

        <div className="graphs-container">
          <div className="graphs">
            <div className="first">
              {view === 1 && <Stats id={1} query="CURRENT_USER_QUERY" />}
              {view === 2 && (
                <Stats
                  id={2}
                  key={key}
                  query="COURSE_SELL_BY_TIME"
                  courseId={courseId}
                />
              )}
            </div>
            <div className="second" />
          </div>
        </div>
        {/* <div className="graphs-container">
          <div className="graphs">
            <div className="first">
              <Stats id={3} />
            </div>
            <div className="second">
              <Stats id={4} />
            </div>
          </div>
        </div> */}
      </Style>
    );
  }
}

export default StatsPage;
