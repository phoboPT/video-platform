import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { perPageCountry } from '../../../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    countriesConnection {
      aggregate {
        count
      }
    }
  }
`;

const Url = styled.div`
  a[aria-disabled='true'] {
    background: grey !important;
    pointer-events: none;
  }

  a[show='true'] {
    background: red !important;
    pointer-events: none;
  }
`;

const PaginationCountry = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      const { count } = data.countriesConnection.aggregate;
      const pages = Math.ceil(count / perPageCountry);
      const { page } = props;
      return (
        <Url>
          <Link
            prefetch
            href={{
              pathname: 'country-list',
              query: { page: page - 1 },
            }}
          >
            <a aria-disabled={page <= 1}>&laquo;</a>
          </Link>{' '}
          {[...Array(pages)].map((x, i) => (
            <Fragment key={i}>
              <Link
                prefetch
                href={{
                  pathname: 'country-list',
                  query: { page: i + 1 },
                }}
              >
                <a show={(page === i + 1).toString()}>{i + 1}</a>
              </Link>{' '}
            </Fragment>
          ))}
          {'   '}
          <Link
            prefetch
            href={{
              pathname: 'country-list',
              query: { page: page + 1 },
            }}
          >
            <a aria-disabled={page >= pages}>&raquo;</a>
          </Link>{' '}
        </Url>
      );
    }}
  </Query>
);

PaginationCountry.propTypes = {
  page: PropTypes.number.isRequired,
};

export default PaginationCountry;
