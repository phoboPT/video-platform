import React, { Component } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import FormCountry from './FormCountry';
import PaginationCountry from './PaginationCountry';
import { perPageCountry } from '../../../config';
import { Container, Table } from '../../styles/AdminListStyle';
import DeleteCountryButton from './DeleteCountryButton';
import { ButtonStyle } from '../../styles/GoBackAdminButton';
import formatString from '../../../lib/formatString';

const ALL_COUNTRIES_QUERY_PAGINATION = gql`
  query ALL_COUNTRIES_QUERY_PAGINATION ($skip:Int=0,$first:Int=${perPageCountry}){
    countries (first:$first,skip:$skip,orderBy:createdAt_ASC){
      name
      id
      code
    }
  }
`;

class CountryList extends Component {
  state = { showList: true };

  changeShow = () => {
    const { showList } = this.state;
    this.setState({ showList: !showList, isEdit: false });
  };

  edit = async item => {
    const { showList } = this.state;
    await this.setState({ showList: !showList, isEdit: true, item });
  };

  render() {
    const { showList, isEdit, item } = this.state;
    const { page } = this.props;
    const skip = page * perPageCountry - perPageCountry;
    return (
      <Query
        query={ALL_COUNTRIES_QUERY_PAGINATION}
        variables={{
          skip,
        }}
      >
        {({ data, loading, error, refetch }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;
          if (!data) return <p>No Data</p>;
          if (data)
            return (
              <>
                <Container>
                  {showList && (
                    <>
                      <h2>Countries</h2>
                      <div id="button">
                        <button
                          type="button"
                          onClick={this.changeShow}
                          id="add-button"
                        >
                          Add new
                        </button>
                      </div>

                      <Table className="tableInfo">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>

                        <tbody>
                          {data.countries.map(item => (
                            <tr key={formatString(item.id, 25)}>
                              <td id="id">{formatString(item.id, 25)}</td>
                              <td>{formatString(item.name, 50)}</td>
                              <td id="action">{formatString(item.code, 25)}</td>

                              <td id="action">
                                <ButtonStyle
                                  type="button"
                                  onClick={() => this.edit(item)}
                                >
                                  ✏
                                </ButtonStyle>
                              </td>
                              <td id="action">
                                <DeleteCountryButton item={item} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="5">
                              <div className="links">
                                <PaginationCountry page={page} />
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </Table>
                    </>
                  )}
                  {!showList && (
                    <FormCountry
                      skip={skip}
                      isEdit={isEdit}
                      item={isEdit ? item : null}
                      refetch={refetch}
                      changePage={this.changeShow}
                    />
                  )}
                </Container>
              </>
            );
        }}
      </Query>
    );
  }
}
CountryList.propTypes = { page: PropTypes.number };
export default CountryList;
export { ALL_COUNTRIES_QUERY_PAGINATION };
