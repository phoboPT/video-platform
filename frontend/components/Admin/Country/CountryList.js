import React, { Component } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// import FormCategory from './FormCategory';
// import Pagination from './Pagination';
import { perPageCategory } from '../../../config';
import { Container, Table } from '../../styles/AdminListStyle';
// import DeleteCategoryButton from './DeleteCategoryButton';

const ALL_COUNTRIES_QUERY_PAGINATION = gql`
  query ALL_COUNTRIES_QUERY_PAGINATION ($skip:Int=0,$first:Int=${perPageCategory}){
    countries (first:$first,skip:$skip,orderBy:createdAt_ASC){
      name
      id
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
    return (
      <Query
        query={ALL_COUNTRIES_QUERY_PAGINATION}
        variables={{
          skip: page * perPageCategory - perPageCategory,
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
                          id="saveButton"
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
                            <tr key={item.id}>
                              <td id="id">{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.code}</td>

                              <td id="center">
                                <button
                                  type="button"
                                  onClick={() => this.edit(item)}
                                >
                                  ✏
                                </button>
                              </td>
                              <td id="center">
                                {/* <DeleteCategoryButton item={item} /> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="4">
                              <div className="links">
                                {/* <Pagination page={page} /> */}
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </Table>
                    </>
                  )}
                  {/* {!showList && (
                    <FormCategory
                      isEdit={isEdit}
                      item={isEdit ? item : null}
                      refetch={refetch}
                      changePage={this.changeShow}
                    />
                  )} */}
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
