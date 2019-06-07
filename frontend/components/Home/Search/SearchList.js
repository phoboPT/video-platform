import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../../Static/Loading';
import Error from '../../Static/ErrorMessage';
import CourseItem from '../CoursesList/CourseItem';
import { Container, CoursesList, Title } from '../../styles/Home';

const SEARCH_COURSE_CATEGORY = gql`
  query SEARCH_COURSE_CATEGORY($category: [ID], $orderBy: String) {
    coursesCategory(category: $category, orderBy: $orderBy) {
      id
      title
      description
      thumbnail
      createdAt
      totalComments
      price
      totalRate
      user {
        id
        name
      }
    }
  }
`;
class SearchList extends Component {
  render() {
    const { info } = this.props;
    console.log('info', info);
    return (
      <Query
        query={SEARCH_COURSE_CATEGORY}
        variables={{
          category: info.category,
          orderBy: `${info.orderBy}_${info.sort}`,
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          if (data.coursesCategory.length > 0) console.log(data);
          return (
            <Container>
              <Container lista>
                <div id="content-container">
                  <CoursesList id="courses-list">
                    {/* {data.coursesList.map(course => (
                        <CourseItem course={course} key={course.id} />
                        ))} */}
                    {data.coursesCategory.map(item => (
                      <CourseItem course={item} key={item.id} />
                    ))}
                  </CoursesList>
                </div>
              </Container>
            </Container>
          );
          return <p>No data</p>;
        }}
      </Query>
    );
  }
}

SearchList.propTypes = {
  info: PropTypes.array.isRequired,
};
export default SearchList;
