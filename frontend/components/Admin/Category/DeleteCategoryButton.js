import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { ALL_CATEGORIES_QUERY_PAGINATION } from './CategoryList';
import Error from '../../Static/ErrorMessage';

const DELETE_CATEGORY_MUTATION = gql`
  mutation DELETE_CATEGORY_MUTATION($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

class DeleteCategoryButton extends React.Component {
  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    // read the cache
    const data = cache.readQuery({
      query: ALL_CATEGORIES_QUERY_PAGINATION,
    });

    const categoryId = payload.data.deleteCategory.id;
    data.categories = data.categories.filter(item => item.id !== categoryId);
    // write back to the cache
    cache.writeQuery({ query: ALL_CATEGORIES_QUERY_PAGINATION, data });
  };

  deleteCategory = async mutation => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Category!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('The Category has been deleted!', {
          icon: 'success',
        });
        mutation();
      } else {
        swal('The Category is safe!');
      }
    });
  };

  render() {
    const { item } = this.props;
    return (
      <Mutation
        mutation={DELETE_CATEGORY_MUTATION}
        variables={{ id: item.id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteCategory: {
            __typename: 'Category',
            id: item.id,
          },
        }}
        refetchQueries={[
          {
            query: ALL_CATEGORIES_QUERY_PAGINATION,
            variables: { skip: 0 },
          },
        ]}
      >
        {(deleteCategory, { loading, error }) => (
          <>
            <Error error={error} />
            <button
              type="button"
              onClick={() => this.deleteCategory(deleteCategory)}
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
