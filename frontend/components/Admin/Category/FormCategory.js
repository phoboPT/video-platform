import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from '../../Static/ErrorMessage';
import { ALL_CATEGORIES_QUERY } from '../../InstructorArea/FormCourse/FormCourse';

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
    // read the cache
    const data = cache.readQuery({ query: ALL_CATEGORIES_QUERY });
    // remove item from cart
    const categoryId = payload.data.updateCategory.id;
    data.categories = data.categories.map(item => {
      if (item.id === categoryId) {
        item.name = name;
      }
      return item;
    });
    // write back to the cache
    cache.writeQuery({ query: ALL_CATEGORIES_QUERY, data });
  };

  render() {
    const { item, isEdit, refetch, changePage } = this.props;
    const { name } = this.state;
    console.log(changePage);
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
        {(updateCategory, { loading: updateLoading, error }) => (
          <Mutation mutation={SAVE_CATEGORY_MUTATION} variables={this.state}>
            {(createCategory, { loading: createLoading, error }) => (
              <div>
                <form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault();
                    if (isEdit) {
                      console.log('update');
                      await updateCategory();
                      this.setState({ name: '' });
                      changePage();
                    } else {
                      console.log('create');
                      await createCategory();
                      refetch();
                      this.setState({ name: '' });
                      changePage();
                    }
                  }}
                >
                  <Error error={error} />
                  <button
                    type="submit"
                    disabled={createLoading || updateLoading}
                    id="saveButton"
                  >
                    Sav{createLoading || updateLoading ? 'ing' : 'e'}
                  </button>
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
