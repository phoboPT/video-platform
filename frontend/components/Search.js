import React, { Component } from "react";
import Downshift from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_VIDEOS_QUERY = gql`
  query SEARCH_VIDEOS_QUERY($searchTerm: String!) {
    videosUser(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      title
      description
    }
  }
`;

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
      videos: res.data.videosUser,
      loading: false
    });
  }, 400);
  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => (
              <input
                type="search"
                onChange={e => {
                  e.persist();
                  this.onChange(e, client);
                }}
              />
            )}
          </ApolloConsumer>

          <DropDown>
            {this.state.videos.map(video => (
              <DropDownItem key={video.id}>
                <p>nome {video.title}</p>
                <p>descricao {video.description}</p>
              </DropDownItem>
            ))}
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
