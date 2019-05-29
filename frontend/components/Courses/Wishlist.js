import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Container, CoursesList, Title } from '../styles/Home';
import WishItem from './WishItem';
import Loading from '../Static/Loading';
import Error from '../Static/ErrorMessage';

const WISHLIST_QUERY = gql`
  query WISHLIST_QUERY {
    wishlists {
      course {
        id
        title
        price
        thumbnail
        state
        createdAt
        totalComments
        totalRate
        category {
          id
          name
        }
        user {
          id
          name
        }
      }
    }
  }
`;

class Wishlist extends Component {
  render() {
    return (
      <Query query={WISHLIST_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Loading />;

          if (error) return <Error error={error} />;

          if (!data) return null;
          if (data) {
            return (
              <Container>
                <h1>WishList</h1>
                <CoursesList>
                  {data.wishlists.map(course => (
                    <WishItem course={course.course} key={course.course.id} />
                  ))}
                </CoursesList>
              </Container>
            );
          }
        }}
      </Query>
    );
  }
}

export default Wishlist;
