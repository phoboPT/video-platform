import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Loading from '../../Static/Loading';
import Error from '../../Static/ErrorMessage';
import CourseItem from '../CoursesList/CourseItem';
import { Container, CoursesList } from '../../styles/Home';

const SEARCH_COURSE_CATEGORY = gql`
  query SEARCH_COURSE_CATEGORY(
    $category: [ID]
    $orderBy: String
    $author: String
  ) {
    coursesCategory(category: $category, orderBy: $orderBy, author: $author) {
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
const P = styled.p`
  margin-top: 5rem;
  opacity: 0.5;
  font-size: 13px;
`;

class SearchList extends Component {
  render() {
    const { info } = this.props;
    return (
      <Query
        query={SEARCH_COURSE_CATEGORY}
        variables={{
          category: info.category,
          orderBy: `${info.orderBy}_${info.sort}`,
          author: info.author,
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          if (data.coursesCategory.length > 0) {
            return (
              <Container>
                <Container lista>
                  <div id="content-container">
                    <CoursesList id="courses-list">
                      {data.coursesCategory.map(item => (
                        <CourseItem course={item} key={item.id} />
                      ))}
                    </CoursesList>
                  </div>
                </Container>
              </Container>
            );
          }
          return <P>Choose One of the Filters To show some Results</P>;
        }}
      </Query>
    );
  }
}

SearchList.propTypes = {
  info: PropTypes.array.isRequired,
};
export default SearchList;
