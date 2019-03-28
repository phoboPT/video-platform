import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CommentItem from "./CommentItem";
import styled from "styled-components";

const ALL_COMMENTS_QUERY = gql`
  query ALL_COMMENTS_QUERY($id: ID!) {
    comCourseList(id: $id) {
      id
      comment
      user {
        id
        name
      }
      course {
        id
      }
      createdAt
    }
  }
`;

const Button = styled.div`
  #myBtn {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: red;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
  }
`;
function scrollFunction() {
  try {
    if (
      document.body.scrollTop > 600 ||
      document.documentElement.scrollTop > 600
    ) {
      document.getElementById("myBtn").style.display = "block";
    } else {
      document.getElementById("myBtn").style.display = "none";
    }
  } catch {}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 150;
  document.documentElement.scrollTop = 150;
}

export class ListComments extends Component {
  componentDidMount = () => {
    window.onscroll = function() {
      scrollFunction();
    };
  };
  render() {
    return (
      <Query query={ALL_COMMENTS_QUERY} variables={{ id: this.props.data.id }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error!</p>;
          if (loading) return <p>Loading...</p>;
          if (!data.comCourseList) return <p>No Comments</p>;

          return (
            <>
              {data.comCourseList.map(comments => (
                <CommentItem comments={comments} key={comments.id} />
              ))}
              <Button>
                <button id="myBtn" onClick={() => topFunction()}>
                  Go Top
                </button>
              </Button>
            </>
          );
        }}
      </Query>
    );
  }
}

export default ListComments;
export { ALL_COMMENTS_QUERY };
