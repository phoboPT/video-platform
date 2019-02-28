import React, { Component } from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_VIDEOS_QUERY = gql`
  query SEARCH_VIDEOS_QUERY($searchTerm: String!) {
    videosUserSearch(where: { title_contains: $searchTerm }) {
      id
      title
      description
    }
  }
`;
function routeToVideo(item) {
  Router.push({
    pathname: "/video",
    query: {
      id: item.id
    }
  });
}

export class AutoComplete extends Component {
  state = {
    videos: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    console.log("Searching results...");
    //turn loading on
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_VIDEOS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      videos: res.data.videosUserSearch,
      loading: false
    });
  }, 400);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToVideo}
          itemToString={video => (video === null ? "" : video.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search For An Video",
                      id: "search",
                      className: this.state.loading ? "loading" : "",
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.videos.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!this.state.videos.length && !this.state.loading && (
                    <DropDownItem> No video called {inputValue}</DropDownItem>
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

export default AutoComplete;
