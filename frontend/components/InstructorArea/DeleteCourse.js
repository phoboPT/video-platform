import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { CURRENT_COURSES_QUERY } from './MyCourses';
import Error from '../Static/ErrorMessage';

const DELETE_COURSE_MUTATION = gql`
  mutation DELETE_COURSE_MUTATION($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;

const ButtonStyle = styled.div`
  button {
    background: none;
    border: none;
    padding: 0px;
  }
`;
class DeleteCourse extends Component {
  deleteCourse = mutation => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Course!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('Your Course has been deleted!', {
          icon: 'success',
        });
        mutation();
      } else {
        swal('Your Course is safe!', {
          icon: 'warning',
        });
      }
    });
  };

  render() {
    const { id, children } = this.props;
    return (
      <Mutation
        mutation={DELETE_COURSE_MUTATION}
        variables={{ id }}
        // update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteCourse: {
            __typename: 'Course',
            id,
          },
        }}
        refetchQueries={[{ query: CURRENT_COURSES_QUERY }]}
      >
        {(deleteCourse, { error }) => {
          if (error) return <Error error={error} />;
          return (
            <ButtonStyle>
              <button
                type="button"
                onClick={() => this.deleteCourse(deleteCourse)}
              >
                {children}
              </button>
            </ButtonStyle>
          );
        }}
      </Mutation>
    );
  }
}
DeleteCourse.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
export default DeleteCourse;
