import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import PaginationStyles from '../../styles/PaginationStyles';
import { perPageCourse } from '../../../config';
import { ALL_COURSES_QUERY, ALL_COURSES_ORDERED } from './ListAllCourses';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    coursesConnection {
      aggregate {
        count
      }
    }
  }
`;

export class Pagination extends Component {
  fetchNext = (client, page) => {
    setTimeout(() => {
      client.query({
        query: ALL_COURSES_QUERY,
        variables: {
          skip: (page + 1) * perPageCourse - perPageCourse,
        },
      });
      client.query({
        query: ALL_COURSES_ORDERED,
        variables: {
          skip: (page + 1) * perPageCourse - perPageCourse,
        },
      });
    }, 2500);
  };

  render() {
    const {
      isInterest,
      page,
      animationSliderControlForward,
      animationSliderControlBackward,
      count,
    } = this.props;
    return (
      <Query query={PAGINATION_QUERY}>
        {({ data, loading, error, client }) => {
          if (loading) return null;
          if (error) return <p>Error...</p>;
          const { count: coursesCount } = data.coursesConnection.aggregate;

          const pages = Math.ceil(
            (isInterest ? count : coursesCount) / perPageCourse
          );

          return (
            <>
              {page > 1 && (
                <button
                  disabled={page <= 1}
                  className="Left"
                  type="button"
                  id="arrowbutton"
                  onClick={() => animationSliderControlBackward()}
                >
                  <img
                    alt="arrow"
                    id="arrow"
                    src="../../../static/arrowleft.webp"
                  />
                </button>
              )}
              {isInterest
                ? page < pages
                : page < pages && (
                    <button
                      disabled={isInterest ? page >= pages : page >= pages}
                      className="Right"
                      id="arrowbutton"
                      type="button"
                      onLoad={() => this.fetchNext(client, page)}
                      onClick={() => animationSliderControlForward()}
                    >
                      <img
                        alt="arrow"
                        id="arrow"
                        src="../../../static/arrowright.webp"
                      />
                    </button>
                  )}
            </>
          );
        }}
      </Query>
    );
  }
}

Pagination.propTypes = {
  isInterest: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  animationSliderControlForward: PropTypes.func.isRequired,
  animationSliderControlBackward: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default Pagination;
