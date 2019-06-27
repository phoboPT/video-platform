import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from '../../Static/ErrorMessage';
import { ALL_CATEGORIES_QUERY_PAGINATION } from './CategoryList';
import { ButtonStyle } from '../../styles/GoBackAdminButton';

const SAVE_CATEGORY_MUTATION = gql`
  mutation SAVE_CATEGORY_MUTATION($name: String!) {
    createCategory(name: $name) {
      id
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UPDATE_CATEGORY_MUTATION($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name) {
      id
    }
  }
`;

class FormCategory extends Component {
  state = { name: this.props.item ? this.props.item.name : '' };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    const { name } = this.state;
    const { skip } = this.props;
    // read the cache
    const data = cache.readQuery({
      query: ALL_CATEGORIES_QUERY_PAGINATION,
      variables: { skip },
    });
    // remove item from cart
    const categoryId = payload.data.updateCategory.id;
    data.categories = data.categories.map(item => {
      if (item.id === categoryId) {
        item.name = name;
      }
      return item;
    });
    // write back to the cache
    cache.writeQuery({ query: ALL_CATEGORIES_QUERY_PAGINATION, data });
  };

  render() {
    const { item, isEdit, refetch, changePage } = this.props;
    const { name } = this.state;
    return (
      <Mutation
        mutation={UPDATE_CATEGORY_MUTATION}
        variables={{ id: item ? item.id : '', name }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          updateCategory: {
            __typename: 'Category',
            id: item ? item.id : '',
          },
        }}
      >
        {(updateCategory, { loading: updateLoading, error: updateError }) => (
          <Mutation mutation={SAVE_CATEGORY_MUTATION} variables={this.state}>
            {(
              createCategory,
              { loading: createLoading, error: createError }
            ) => (
              <div>
                <form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault();
                    if (isEdit) {
                      await updateCategory();
                      this.setState({ name: '' });
                      changePage();
                    } else {
                      await createCategory();
                      refetch();
                      this.setState({ name: '' });
                      changePage();
                    }
                  }}
                >
                  {isEdit ? <h2>Edit</h2> : <h2>Add New</h2>}
                  <ButtonStyle type="button" onClick={changePage}>
                    ⬅ Go Back
                  </ButtonStyle>
                  <br />
                  <Error error={createError || updateError} />
                  <div id="form">
                    <button
                      type="submit"
                      disabled={createLoading || updateLoading}
                      id="saveButton"
                    >
                      Sav{createLoading || updateLoading ? 'ing' : 'e'}
                    </button>
                  </div>
                  <br />
                  <br />
                  <br />
                  <label htmlFor="name">
                    Name:
                    <input
                      id="name"
                      type="name"
                      name="name"
                      placeholder="Name"
                      defaultValue={name}
                      onChange={this.saveToState}
                    />
                  </label>
                </form>
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

FormCategory.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.bool,
  refetch: PropTypes.func,
  changePage: PropTypes.func,
};

export default FormCategory;
