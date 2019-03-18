import gql from "graphql-tag";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../../Authentication/User";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
    }
  }
`;

export class AddToCart extends Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={{ id }}
      >
        {(addToCart, { loading }) => (
          <button disabled={loading} onClick={addToCart}>
            Add{loading && "ing"} To Cart
          </button>
        )}
      </Mutation>
    );
  }
}

export default AddToCart;
