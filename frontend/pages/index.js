import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import User from '../components/Authentication/User';
import ListAllCourses, {
  RENDER_QUERY,
} from '../components/Home/CoursesList/ListAllCourses';
import Search from '../components/Home/Search';
import Loading from '../components/Static/Loading';

const Container = styled.div`
  background-image: url('../static/backgroud.webp');
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

const TopBar = styled.div`
  #banner1 {
    margin: 1rem auto auto auto;
    width: 70%;
    img {
      width: 100%;
    }
  }
  #banner {
    margin: 1rem auto auto auto;
    width: 90%;

    img {
      width: 100%;
    }
    #info {
      margin-top: -2px;
      background: #3e1163;
      width: 100%;
      display: flex;
      div {
        margin-top: 1rem;
        text-align: center;
        width: 25%;
        p {
          font-size: 12px;
          color: white;
          text-align: center;
          width: 100%;
        }
        strong {
          color: white;
          font-size: 15px;
        }
      }
    }
  }
  h2 {
    margin-top: 4rem;
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
  margin: 2rem auto 0 auto;
  border: 1px solid white;
`;

const SearchStyle = styled.div`
  display: flex;
  #image {
    width: 42px;
    height: 42px;
    order: 1;
    margin: 0 2rem 0 0;
    cursor: pointer;
  }
  #search {
    order: 1;
    flex: 1;
  }
`;
class Home extends Component {
  render() {
    return (
      <User>
        {({ data, loading }) => {
          if (loading) return <Loading />;
          if (!data.me) {
            return (
              <>
                <TopBar>
                  <div id="banner">
                    <img alt="banner" src="../static/banner.webp" />
                    <div id="info">
                      <div>
                        <strong>Especialistas </strong>
                        <p>Aprenda com o melhor de cada área</p>
                      </div>
                      <div>
                        <strong>Diversidade</strong>
                        <p>Cursos para todos os gostos</p>
                      </div>
                      <div>
                        <strong>Access for life</strong>
                        <p>Learn in your time</p>
                      </div>
                      <div>
                        <strong>Choice of Interests</strong>
                        <p>Courses to your liking</p>
                      </div>
                    </div>
                  </div>
                </TopBar>
                <Courses>
                  <ListAllCourses query="ALL_COURSES_RATING" noUser />
                </Courses>
              </>
            );
          }
          return (
            <div key={data.me.id}>
              <SearchStyle>
                <Link
                  href={{
                    pathname: '/search-filter',
                  }}
                >
                  <img
                    id="image"
                    alt="Search whit filters"
                    src="../static/filter.webp"
                  />
                </Link>
                <Search />
              </SearchStyle>
              <TopBar>
                <div id="banner1">
                  <img alt="banner" src="../static/bannerIn.webp" />
                </div>
              </TopBar>
              {data.me.interests.length > 0 && (
                <ListAllCourses query="ALL_COURSE_INTERESTS" />
              )}
              <ListAllCourses query="ALL_COURSES_QUERY" />
              <ListAllCourses query="ALL_COURSES_ORDERED" />
              <ListAllCourses query="ALL_COURSES_RATING" />
            </div>
          );
        }}
      </User>
    );
  }
}

export default Home;
export { RENDER_QUERY };
