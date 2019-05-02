import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import { Container } from '../../../styles/Home';

const ALL_COMMENTS_QUERY = gql`
  query ALL_COMMENTS_QUERY($id: ID!) {
    rateCourseList(id: $id) {
      id
      comment
      user {
        id
        name
      }
      course {
        id
      }
      rate
      createdAt
    }
  }
`;
const Title = styled.div`
  max-width: 1000px;
  margin: 30px auto 0 auto;
  font-size: 24px;
  padding-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(58, 58, 58, 0.6);
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

class ListComments extends Component {
  componentDidMount = () => {
    window.onscroll = () => {
      this.scrollFunction();
    };
  };

  scrollFunction = () => {
    try {
      if (
        document.body.scrollTop > 600 ||
        document.documentElement.scrollTop > 600
      ) {
        document.getElementById('myBtn').style.display = 'block';
      } else {
        document.getElementById('myBtn').style.display = 'none';
      }
    } catch (error) {
      // console.warn(error);
    }
  };

  // When the user clicks on the button, scroll to the top of the document
  topFunction = () => {
    document.body.scrollTop = 150;
    document.documentElement.scrollTop = 150;
  };

  render() {
    return (
      <Query query={ALL_COMMENTS_QUERY} variables={{ id: this.props.data.id }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error!</p>;
          if (loading) return <p>Loading...</p>;
          if (!data.rateCourseList) return <p>No Avaliations</p>;
          return (
            <>
              <Title>
                <p>Reviews</p>
              </Title>
              {data.rateCourseList.map(comments => (
                <CommentItem
                  comments={comments}
                  rating={comments.rate}
                  key={comments.id}
                />
              ))}
              <Button>
                <button id="myBtn" onClick={this.topFunction}>
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
