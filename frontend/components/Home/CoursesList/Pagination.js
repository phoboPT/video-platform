import React from "react";
import PaginationStyles from "../../styles/PaginationStyles";
import gql from "graphql-tag";
import { Query, graphql, compose } from "react-apollo";
import { perPageCourse } from "../../../config";
import {
  ALL_COURSES_QUERY,
  ALL_COURSES_ORDERED,
} from "../CoursesList/ListAllCourses";

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
      const count = data.coursesConnection.aggregate.count;

      const pages = Math.ceil(
        (props.isInterest ? props.count : count) / perPageCourse,
      );
      const page = props.page;

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
            id="arrowbutton"
            onClick={() => props.animationSliderControlBackward()}
          >
            <img id="arrow" src="../../../static/arrowleft.png" />
          </button>

          <button
            disabled={props.isInterest ? page >= pages : page >= pages}
            className="Right"
            id="arrowbutton"
            onLoad={fetchNext()}
            onClick={() => props.animationSliderControlForward()}
          >
            <img id="arrow" src="../../../static/arrowright.png" />
          </button>
        </>
      );
    }}
  </Query>
);

export default Pagination;
