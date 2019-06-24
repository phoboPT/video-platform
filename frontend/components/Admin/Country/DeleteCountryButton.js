import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { ALL_COUNTRIES_QUERY_PAGINATION } from './CountryList';
import Error from '../../Static/ErrorMessage';

const DELETE_COUNTRY_MUTATION = gql`
  mutation DELETE_COUNTRY_MUTATION($id: ID!) {
    deleteCountry(id: $id) {
      id
    }
  }
`;

class DeleteCountryButton extends React.Component {
  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    // read the cache
    const data = cache.readQuery({
      query: ALL_COUNTRIES_QUERY_PAGINATION,
    });

    const countryId = payload.data.deleteCountry.id;
    data.countries = data.countries.filter(item => item.id !== countryId);
    // write back to the cache
    cache.writeQuery({ query: ALL_COUNTRIES_QUERY_PAGINATION, data });
  };

  deleteCountry = mutation => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Country!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('The Country has been deleted!', {
          icon: 'success',
        });
        mutation();
      } else {
        swal('The Country is safe!');
      }
    });
  };

  render() {
    const { item } = this.props;
    return (
      <Mutation
        mutation={DELETE_COUNTRY_MUTATION}
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
            query: ALL_COUNTRIES_QUERY_PAGINATION,
            variables: { skip: 0 },
          },
        ]}
      >
        {(deleteCountry, { loading, error }) => (
          <>
            <Error error={error} />
            <button
              type="button"
              onClick={() => this.deleteCountry(deleteCountry)}
            >
              ❎
            </button>
          </>
        )}
      </Mutation>
    );
  }
}
DeleteCountryButton.propTypes = {
  item: PropTypes.object.isRequired,
};
export default DeleteCountryButton;
