import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import DatePicker from 'react-datepicker';
import Stats from './Stats';
import { CURRENT_COURSES_QUERY } from './MyCourses';
import Loading from '../Static/Loading';

const Style = styled.div`
  .graphs-container {
    display: block;

    .title {
      display: flex;
      margin: 0 0 0 5rem;
      .col {
        margin: 2rem;
      }
    }
    .category {
      margin: 2rem 0 2rem 5rem;
    }
    .graphs {
      display: flex;
      .first {
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
    view: 1,
    courseId: '',
    key: 0,
  };

  componentWillMount() {
    const date = new Date();
    this.setState({
      startDate: date.toISOString().split('T')[0],
    });
  }

  handleChangeCourse = async e => {
    const { key } = this.state;
    await this.setState({
      courseId: e.target.value,
      key: key + 1,
    });
  };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
  };

  handleChange = date => {
    const { key } = this.state;
    this.setState({
      startDate: date.toISOString().split('T')[0],
      key: key + 1,
    });
  };

  render() {
    const { courseId, view, key, startDate } = this.state;

    return (
      <Query query={CURRENT_COURSES_QUERY}>
        {({ data, loading }) => {
          if (loading) return <Loading />;
          if (!data) return <p>No Data Yet</p>;
          if (data) {
            const { coursesUser: courses } = data;
            return (
              <Style>
                <div className="graphs-container">
                  <div className="title">
                    <div className="col">
                      <button type="button" id={1} onClick={this.changeView}>
                        All Courses
                      </button>
                    </div>
                    <div className="col">
                      <button type="button" id={2} onClick={this.changeView}>
                        By Course
                      </button>
                    </div>
                    <div className="col">
                      <button type="button" id={3} onClick={this.changeView}>
                        All By Date
                      </button>
                    </div>
                  </div>
                  <div className="category">
                    {view === 2 && (
                      <label htmlFor="Course">
                        Category
                        <select
                          id="dropdownlist"
                          onChange={this.handleChangeCourse}
                          name="Course"
                          defaultValue={courses[0].title || 'a'}
                        >
                          <option value="a" disabled hidden>
                            Select a Course
                          </option>
                          {courses.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>

                  <div className="graphs">
                    <div className="first">
                      {view === 1 && <Stats query="CURRENT_USER_QUERY" />}
                      {view === 2 && (
                        <Stats
                          key={key}
                          query="COURSE_SELL_BY_TIME"
                          courseId={courseId}
                        />
                      )}
                      {view === 3 && (
                        <>
                          <DatePicker
                            todayButton="Today"
                            dateFormat="dd/MM/yyyy"
                            selected={new Date(startDate)}
                            onChange={this.handleChange}
                          />
                          <Stats
                            key={key}
                            query="ALL_BY_DATE"
                            courseId={courseId}
                            date={startDate}
                          />
                        </>
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
        }}
      </Query>
    );
  }
}

StatsPage.propTypes = {};

export default StatsPage;
