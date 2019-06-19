import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import DatePicker from 'react-datepicker';
import Stats, { Dooted } from './Stats';
import { CURRENT_COURSES_QUERY } from './MyCourses';
import Loading from '../Static/Loading';

const Style = styled.div`
  .graphs-container {
    display: block;

    #container-graphs {
      box-shadow: 0 0 7px #c4c4c4;
      background: #fcfcfc;
      border: 2px solid #5e3232;
      width: 70%;
      margin: auto;
      #top-text {
        padding-left: 1rem;
        margin: 2rem auto auto auto;
      }
      .Buttons {
        padding-bottom: 1rem;
        display: flex;
        margin: 2rem auto 1rem auto;
        align-content: center;
        .col {
          flex: 1;
          margin: auto;
          text-align: center;
          button {
            color: white;
            border-radius: 6px;
            cursor: pointer;
            width: 150px;
            height: 40px;
            border: none;
            background: #a1b7cc;
            span {
              border: none;
            }

            &:focus {
              outline: none;
            }

            &:hover {
              background: #90a3b5;
            }
            &:disabled {
              background: #3c484f;
              span {
                border-bottom: 1px solid red;
              }
            }
          }
        }
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
    const { key } = this.state;
    this.setState({ view: parseInt(e.target.id), key: key + 1 });
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
                  <div id="container-graphs">
                    <p id="top-text">Graph Selection: </p>
                    <div className="Buttons">
                      <div className="col">
                        <button
                          type="button"
                          disabled={view === 1}
                          id={1}
                          onClick={this.changeView}
                        >
                          <span id={1}> All Courses</span>
                        </button>
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          disabled={view === 2}
                          id={2}
                          onClick={this.changeView}
                        >
                          <span id={2}> By Course</span>
                        </button>
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          disabled={view === 3}
                          id={3}
                          onClick={this.changeView}
                        >
                          <span id={3}> By Date</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="graphs">
                    <div className="first">
                      {view === 1 && (
                        <Stats key={key} query="CURRENT_USER_QUERY" />
                      )}
                      {view === 2 && (
                        <Dooted>
                          <p id="title">Stats of an Single Course</p>
                          <div className="category">
                            <p>Select an Course</p>
                            <select
                              className="select-css"
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
                          </div>
                          <Stats
                            key={key}
                            query="COURSE_SELL_BY_TIME"
                            courseId={courseId}
                          />
                        </Dooted>
                      )}
                      {view === 3 && (
                        <Dooted>
                          <p id="title">
                            Go Check The day that u have more sells
                          </p>
                          <div id="date">
                            <img
                              alt="calendar"
                              src="../../static/calendar.png"
                            />
                            <DatePicker
                              popperClassName="custom-style"
                              todayButton="Today"
                              dateFormat="dd/MM/yyyy"
                              selected={new Date(startDate)}
                              onChange={this.handleChange}
                            />
                          </div>

                          <Stats
                            key={key}
                            query="ALL_BY_DATE"
                            courseId={courseId}
                            date={startDate}
                          />
                        </Dooted>
                      )}
                    </div>
                  </div>
                </div>
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
