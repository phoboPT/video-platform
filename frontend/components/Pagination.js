import React, { Component } from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";
import Head from "next/head";
import Link from "next/link";

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
      if (loading) return <p>Loading...</p>;
      const count = data.videosConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return (
        <PaginationStyles>
          <Link
            prefetch
            href={{
              pathname: "courses",
              query: { page: page - 1 }
            }}
          >
            <a className="prev" aria-disable={page <= 1}>
              Prev
            </a>
          </Link>
          <p>
            Page {props.page} of {pages}!
          </p>
          <p>{count} Videos Total</p>
          <Link
            prefetch
            href={{
              pathname: "courses",
              query: { page: page + 1 }
            }}
          >
            <a className="prev" aria-disable={page >= 1}>
              Next
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
