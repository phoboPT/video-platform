import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import requestState from '../../../lib/requestStates';
import { ButtonStyle } from '../../styles/GoBackAdminButton';
import Error from '../../Static/ErrorMessage';
import { ALL_INSTRUTOR_QUERY_PAGINATION } from './InstrutorList';

const UPDATE_INSTRUTOR_MUTATION = gql`
  mutation UPDATE_INSTRUTOR_MUTATION(
    $id: ID!
    $response: String
    $state: String
    $userId: ID!
  ) {
    updateInstructor(
      id: $id
      response: $response
      state: $state
      userId: $userId
    ) {
      id
    }
  }
`;

class FormInstrutor extends Component {
  state = {
    response: this.props.item ? this.props.item.response : '',
    state: this.props.item ? this.props.item.state : '',
    id: this.props.item ? this.props.item.id : '',
    userId: this.props.item ? this.props.item.user.id : '',
  };

  handleChange = async e => {
    await this.setState({ state: e.target.value });
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    const { response, state } = this.state;
    const { skip } = this.props;
    // read the cache
    const data = cache.readQuery({
      query: ALL_INSTRUTOR_QUERY_PAGINATION,
      variables: { skip },
    });
    // remove item from cart
    const instrutorId = payload.data.updateInstructor.id;
    data.becomeInstructors = data.becomeInstructors.map(item => {
      if (item.id === instrutorId) {
        item.response = response;
        item.state = state;
      }
      return item;
    });
    // write back to the cache
    cache.writeQuery({ query: ALL_INSTRUTOR_QUERY_PAGINATION, data });
  };

  render() {
    const { id, userId } = this.state;
    const { changePage, refetch } = this.props;
    return (
      <Mutation
        mutation={UPDATE_INSTRUTOR_MUTATION}
        variables={this.state}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          updateInstructor: {
            __typename: 'BecomeInstructor',
            id,
          },
        }}
      >
        {(updateInstructor, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await updateInstructor();
                refetch();
                this.setState({ response: '', state: '' });
                changePage();
              }}
            >
              <br />
              <Error error={error} />
              <div id="form">
                <button type="submit" disabled={loading} id="saveButton">
                  Sav{loading ? 'ing' : 'e'}
                </button>
              </div>
              <h2>Response</h2>
              <select id="state" defaultValue="a" onChange={this.handleChange}>
                <option value="a" disabled hidden>
                  State
                </option>

                {requestState.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <p>Response</p>

              <textarea
                name="response"
                id="response"
                cols="100"
                rows="20"
                onChange={this.saveToState}
              />
            </form>
          );
        }}
      </Mutation>
    );
  }
}
FormInstrutor.propTypes = {
  refetch: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default FormInstrutor;
