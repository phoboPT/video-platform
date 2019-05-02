import React from 'react';
import gql from 'graphql-tag';
import { Query, graphql, compose } from 'react-apollo';
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

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error, client }) => {
      if (loading) return null;
      if (error) return <p>Error...</p>;
      const { count } = data.coursesConnection.aggregate;

      const pages = Math.ceil(
        (props.isInterest ? props.count : count) / perPageCourse
      );
      const { page } = props;

      const fetchNext = () => {
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
      };

      return (
        <>
          <button
            disabled={page <= 1}
            className="Left"
            type="button"
            id="arrowbutton"
            onClick={() => props.animationSliderControlBackward()}
          >
            <img alt="arrow" id="arrow" src="../../../static/arrowleft.png" />
          </button>
          <button
            disabled={props.isInterest ? page >= pages : page >= pages}
            className="Right"
            id="arrowbutton"
            type="button"
            onLoad={fetchNext()}
            onClick={() => props.animationSliderControlForward()}
          >
            <img alt="arrow" id="arrow" src="../../../static/arrowright.png" />
          </button>
        </>
      );
    }}
  </Query>
);

export default Pagination;
