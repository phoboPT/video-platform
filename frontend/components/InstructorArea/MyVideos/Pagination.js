import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { perPage } from '../../../config';
import PaginationStyles from '../../styles/PaginationStyles';
import Loading from '../../Static/Loading';
import Error from '../../Static/ErrorMessage.js';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    videosConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      const { count } = data.videosConnection.aggregate;
      const pages = Math.ceil(count / perPage);
      const { page } = props;

      if (error) return <Error error={error} />;

      if (!data) return <p>No Data</p>;
      if (data)
        return (
          <PaginationStyles>
            <Head>
              <title>
                Sick Fits! - Page {page} of {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: 'courses',
                query: { page: page - 1 },
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                ⬅ Prev
              </a>
            </Link>
            <p>
              Page {page} of {pages}
            </p>
            <p>{count} Items Total</p>
            <Link
              prefetch
              href={{
                pathname: 'courses',
                query: { page: page + 1 },
              }}
            >
              <a className="prev" aria-disabled={page >= pages}>
                Next ➡
              </a>
            </Link>
          </PaginationStyles>
        );
    }}
  </Query>
);

export default Pagination;
