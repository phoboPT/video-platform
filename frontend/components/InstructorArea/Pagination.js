import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { perPage } from '../../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    coursesUserConnection {
      aggregate {
        count
      }
    }
  }
`;
const PaginationStyle = styled.div`
  display: flex;
  #Left {
    flex: 1;
    order: 1;
  }
  #Right {
    text-align: right;
    order: 2;
  }
  button {
    width: 70px;
    height: 70px;
    background: none;
    border: none;

    img {
      cursor: pointer;
      width: 70px;
      height: 70px;
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error, client }) => {
      if (loading) return null;
      if (error) return <p>Error...</p>;
      const { count } = data.coursesUserConnection.aggregate;

      const pages = Math.ceil(count / perPage);
      const { page } = props;

      return (
        <PaginationStyle>
          <div id="Left">
            {page > 1 && (
              <button
                disabled={page <= 1}
                type="button"
                onClick={() => props.Backward()}
              >
                <img
                  alt="arrow"
                  id="arrow"
                  src="../../../static/arrowleft.webp"
                />
              </button>
            )}
          </div>
          <div id="Right">
            {page < pages && (
              <button
                disabled={page >= pages}
                id="Right"
                type="button"
                onClick={() => props.Forward()}
              >
                <img
                  alt="arrow"
                  id="arrow"
                  src="../../../static/arrowright.webp"
                />
              </button>
            )}
          </div>
        </PaginationStyle>
      );
    }}
  </Query>
);

export default Pagination;
