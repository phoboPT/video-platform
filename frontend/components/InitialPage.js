import React, { Component } from 'react';
import styled from 'styled-components';
import SimpleUser from './Authentication/SimpleUser';
import Home from '../pages/home';
import Loading from './Static/Loading';
import ListAllCourses, {
  RENDER_QUERY,
} from './Home/CoursesList/ListAllCourses';

const Container = styled.div`
  background-image: url('../static/backgroud.jpeg');
  width: 100%;
  height: 500px;
  background-size: cover;
  -webkit-background-size: cover;
  background-position: center center;
  position: absolute;
  left: 0;
  right: 0;

  z-index: -2;
  .title {
    text-align: center;
    color: #fff;
    font-size: 3rem;
    z-index: 2;
    h1 {
    }
  }
`;

const Info = styled.div`
  display: flex;
  min-height: 70px;
  position: absolute;
  left: 0;
  width: 100%;
  background-image: linear-gradient(
    to right bottom,
    #e91010,
    #e82825,
    #e63835,
    #e34544,
    #df5151
  );
  margin: 500px auto 0 auto;
  border: 1px solid black;
  text-align: center;

  .first {
    margin: auto;
    order: 1;
    flex: 1;
  }
  .second {
    margin: auto;
    order: 2;
    flex: 1;
  }
  .third {
    margin: auto;
    order: 3;
    flex: 1;
  }
`;

const Courses = styled.div`
  margin: 500px auto 0 auto;
  border: 1px solid white;
`;
class InitialPage extends Component {
  render() {
    return (
      <>
        <Container>
          <div className="title">
            <h1>Picus Creative Video Platform</h1>
          </div>
        </Container>

        <Info>
          <div className="first">The Best</div>
          <div className="second">100+ Topics</div>
          <div className="third">Try now</div>
        </Info>
        <Courses>
          <ListAllCourses query="ALL_COURSES_RATING" noUser />
        </Courses>
      </>
    );
  }
}

export default InitialPage;
