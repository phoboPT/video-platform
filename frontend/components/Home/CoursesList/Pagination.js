import React from "react";
import PaginationStyles from "../../styles/PaginationStyles";
import gql from "graphql-tag";
import { Query, graphql, compose } from "react-apollo";
import { perPageCourse } from "../../../config";
import {
  ALL_COURSES_QUERY,
  ALL_COURSES_ORDERED
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
      const pages = Math.ceil(count / perPageCourse);
      const page = props.page;

      const fetchNext = () => {
        client.query({
          query: ALL_COURSES_QUERY,
          variables: {
            skip: (page + 1) * perPageCourse - perPageCourse
          }
        });
        client.query({
          query: ALL_COURSES_ORDERED,
          variables: {
            skip: (page + 1) * perPageCourse - perPageCourse
          }
        });
      };
      return (
        <>
          <button
            disabled={page <= 1}
            className="Left"
            id="arrowbutton"
            onClick={() => props.saveState1()}
          >
            <img id="arrow" src="../../../static/arrowleft.png" />
          </button>

          <button
            disabled={page > 1}
            className="Right"
            id="arrowbutton"
            onLoad={fetchNext()}
            onClick={() => props.saveState()}
          >
            <img id="arrow" src="../../../static/arrowright.png" />
          </button>
        </>
      );
    }}
  </Query>
);

export default Pagination;
