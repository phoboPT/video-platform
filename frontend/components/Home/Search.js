import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';

const SEARCH_COURSES_QUERY = gql`
  query SEARCH_COURSES_QUERY($searchTerm: String!) {
    coursesSearch(where: { title: $searchTerm }) {
      id
      title
      description
    }
  }
`;
function routeToCourse(item) {
  Router.push({
    pathname: '/course',
    query: {
      id: item.id,
    },
  });
}

export class Search extends Component {
  state = {
    courses: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_COURSES_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      courses: res.data.coursesSearch,
      loading: false,
    });
  }, 300);

  render() {
    resetIdCounter();
    const { courses, loading } = this.state;
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToCourse}
          itemToString={course => (course === null ? '' : course.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search For An Course',
                      id: 'search',
                      className: loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {courses.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!courses.length && !loading && (
                    <DropDownItem> No course called {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default Search;
