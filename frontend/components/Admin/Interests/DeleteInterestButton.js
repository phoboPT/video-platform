import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { ALL_INTERESTS_QUERY_PAGINATION } from './InterestList';
import Error from '../../Static/ErrorMessage';

const DELETE_INTEREST_MUTATION = gql`
  mutation DELETE_CATEGORY_MUTATION($id: ID!) {
    deleteInterest(id: $id) {
      id
    }
  }
`;

class DeleteCategoryButton extends React.Component {
  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    // read the cache
    const data = cache.readQuery({
      query: ALL_INTERESTS_QUERY_PAGINATION,
    });

    const categoryId = payload.data.deleteInterest.id;
    data.interests = data.interests.filter(item => item.id !== categoryId);
    // write back to the cache
    cache.writeQuery({ query: ALL_INTERESTS_QUERY_PAGINATION, data });
  };

  deleteInterest = async mutation => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Interest!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('The Interest has been deleted!', {
          icon: 'success',
        });
        mutation();
      } else {
        swal('The Interest is safe!');
      }
    });
  };

  render() {
    const { item } = this.props;
    return (
      <Mutation
        mutation={DELETE_INTEREST_MUTATION}
        variables={{ id: item.id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteInterest: {
            __typename: 'Interest',
            id: item.id,
          },
        }}
        refetchQueries={[
          {
            query: ALL_INTERESTS_QUERY_PAGINATION,
            variables: { skip: 0 },
          },
        ]}
      >
        {(deleteInterest, { loading, error }) => (
          <>
            <Error error={error} />
            <button
              type="button"
              onClick={() => this.deleteInterest(deleteInterest)}
            >
              ❎
            </button>
          </>
        )}
      </Mutation>
    );
  }
}
DeleteCategoryButton.propTypes = {
  item: PropTypes.object.isRequired,
};
export default DeleteCategoryButton;
