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
        <PaginationStyles>
          {
            <button onClick={() => props.saveState1()}>
              <img src="https://cdn.icon-icons.com/icons2/936/PNG/512/long-arrow-pointing-to-left_icon-icons.com_73501.png" />
            </button>
          }

          <p>
            {page} of {pages}
          </p>
          <p>Courses {count}</p>

          {
            <button onLoad={fetchNext()} onClick={() => props.saveState()}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV04lvszjgi-_33prx5fcqM1cIxiRYuXOTIqmVzFEJ81M6mmgK" />
            </button>
          }
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
