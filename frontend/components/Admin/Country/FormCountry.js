import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from '../../Static/ErrorMessage';
import { ALL_COUNTRIES_QUERY_PAGINATION } from './CountryList';

const SAVE_COUNTRY_MUTATION = gql`
  mutation SAVE_COUNTRY_MUTATION($name: String!, $code: String!) {
    createCountry(name: $name, code: $code) {
      id
    }
  }
`;

const UPDATE_COUNTRY_MUTATION = gql`
  mutation UPDATE_COUNTRY_MUTATION($id: ID!, $name: String!, $code: String) {
    updateCountry(id: $id, name: $name, code: $code) {
      id
    }
  }
`;

class FormCountry extends Component {
  state = {
    name: this.props.item ? this.props.item.name : '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    const { name, code } = this.state;
    const { skip } = this.props;
    // read the cache
    const data = cache.readQuery({
      query: ALL_COUNTRIES_QUERY_PAGINATION,
      variables: { skip },
    });

    // remove item from cart
    const countryId = payload.data.updateCountry.id;
    data.countries = data.countries.map(item => {
      if (item.id === countryId) {
        item.name = name;
        item.code = code;
      }
      return item;
    });
    // write back to the cache
    cache.writeQuery({ query: ALL_COUNTRIES_QUERY_PAGINATION, data });
  };

  render() {
    const { item, isEdit, refetch, changePage } = this.props;
    const { name, code } = this.state;
    return (
      <Mutation
        mutation={UPDATE_COUNTRY_MUTATION}
        variables={{
          id: item ? item.id : '',
          name,
          code,
        }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          updateCountry: {
            __typename: 'Country',
            id: item ? item.id : '',
          },
        }}
      >
        {(updateCountry, { loading: updateLoading, error: updateError }) => (
          <Mutation mutation={SAVE_COUNTRY_MUTATION} variables={this.state}>
            {(
              createCountry,
              { loading: createLoading, error: createError }
            ) => (
              <div>
                <form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault();
                    if (isEdit) {
                      await updateCountry();
                      this.setState({ name: '', code: '' });
                      changePage();
                    } else {
                      await createCountry();
                      refetch();
                      this.setState({ name: '', code: '' });
                      changePage();
                    }
                  }}
                >
                  {isEdit ? <h2>Edit</h2> : <h2>Add New</h2>}
                  <Error error={createError || updateError} />
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
                  <br />
                  <br />
                  <label htmlFor="code">
                    Code:
                    <input
                      id="code"
                      type="code"
                      name="code"
                      placeholder="Code"
                      defaultValue={code || ''}
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

FormCountry.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.bool,
  refetch: PropTypes.func,
  changePage: PropTypes.func,
  skip: PropTypes.number.isRequired,
};

export default FormCountry;
