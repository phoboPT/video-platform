import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import Loading from '../../../Static/Loading';
import Error from '../../../Static/ErrorMessage';

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
    const { data, refetch } = this.props;
    return (
      <Query query={ALL_COMMENTS_QUERY} variables={{ id: data.id }}>
        {({ error, loading, data: newData }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          if (!newData.rateCourseList) return <p>No Avaliations</p>;
          return (
            <>
              <Title>
                <p>Reviews</p>
              </Title>
              {newData.rateCourseList.map(comments => (
                <CommentItem
                  refetch={refetch}
                  courseId={data.id}
                  comments={comments}
                  rating={comments.rate}
                  key={comments.id}
                />
              ))}
              <Button>
                <button type="button" id="myBtn" onClick={this.topFunction}>
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

ListComments.propTypes = {
  data: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ListComments;
export { ALL_COMMENTS_QUERY };
