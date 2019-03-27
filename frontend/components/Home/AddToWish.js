import gql from "graphql-tag";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import styled from "styled-components";
import User from "../Authentication/User";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
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
    fill: grey;
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
  state = { animationControl: "", classButton: "", hasUpdated: false };
  changeClass = async mutation => {
    this.setState({ class: "animate" });
    const res = await mutation();
    this.setState({ classButton: "added" });
    console.log(res.data.addToWish.id);
  };

  render() {
    const { id } = this.props;
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) return null;

          if (!this.state.hasUpdated) {
            if (me.wishlist) {
              me.wishlist.map(e => {
                if (e.course.id == id) {
                  this.setState({ classButton: "added", hasUpdated: true });
                }
              });
            }
          }

          return (
            <Mutation
              mutation={ADD_TO_CART_MUTATION}
              // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
              variables={{ id }}
            >
              {(addToWish, { loading }) => (
                <Img>
                  <button
                    className={this.state.classButton}
                    disabled={loading}
                    id="search-button"
                    onClick={() => this.changeClass(addToWish)}
                  >
                    <svg className={this.state.class} viewBox="0 0 32 29.6">
                      <path
                        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                  c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                      />
                    </svg>
                  </button>
                </Img>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default AddToWish;
