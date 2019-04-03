import gql from "graphql-tag";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
} from "./CoursesList/ListAllCourses";

const ADD_TO_WISHLIST_MUTATION = gql`
  mutation ADD_TO_WISHLIST_MUTATION($id: ID!) {
    addToWish(id: $id) {
      id
    }
  }
`;

const Img = styled.div`
  margin: auto;
  position: relative;
  background: none !important;
  top: 5px;
  width: 50px;
  fill: red;

  .added {
    fill: gray;
  }

  #search-button {
    width: 50px;
    height: 50px;
    background: none;
    border: none;
  }

  #search-button svg {
    width: 25px;
    height: 25px;
  }
  button:focus {
    outline: none !important;
  }
  .search > div,
  .search > button {
    display: inline-block;
    vertical-align: middle;
  }

  .animate {
    animation: pulse 1s ease forwards;

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.3);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

export class AddToWish extends Component {
  state = {
    ...this.props.data.user,
    courseId: this.props.id,
  };

  changeClass = async mutation => {
    this.setState({ class: "animate" });
    const res = await mutation();
    this.setState({ classButton: "added" });
    if (res) {
    }
  };

  render() {
    const { data } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_WISHLIST_MUTATION}
        refetchQueries={[
          {
            query: ALL_COURSES_QUERY,
            variables: { published: "PUBLISHED", skip: data.skip },
          },

          {
            query: ALL_COURSES_ORDERED,
            variables: { published: "PUBLISHED", skip: data.skip },
          },
          {
            query: ALL_COURSE_INTERESTS,
            variables: { published: "PUBLISHED", skip: data.skip },
          },
        ]}
        variables={{
          id: data.id,
          published: "PUBLISHED",
          skip: this.props.skip,
        }}
      >
        {(addToWish, { loading }) => {
          return (
            <Img>
              <button
                className={this.props.data.wished ? "added" : ""}
                disabled={loading}
                id="search-button"
                onClick={() => this.changeClass(addToWish)}
              >
                <svg className={this.state.class} viewBox="0 0 32 32">
                  <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                  />
                </svg>
              </button>
            </Img>
          );
        }}
      </Mutation>
    );
  }
}

export default AddToWish;
