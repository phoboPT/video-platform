import React, { Component } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import FormCategory from './FormCategory';
import PaginationCategory from './PaginationCategory';
import { perPageCategory } from '../../../config';
import { Container, Table } from '../../styles/AdminListStyle';
import DeleteCategoryButton from './DeleteCategoryButton';

const ALL_CATEGORIES_QUERY_PAGINATION = gql`
  query ALL_CATEGORIES_QUERY_PAGINATION ($skip:Int=0,$first:Int=${perPageCategory}){
    categories (first:$first,skip:$skip,orderBy:createdAt_ASC){
      name
      id
    }
  }
`;

class CategoryList extends Component {
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
    const skip = page * perPageCategory - perPageCategory;
    return (
      <Query
        query={ALL_CATEGORIES_QUERY_PAGINATION}
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
                      <h2>Categories</h2>
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
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.categories.map(item => (
                            <tr key={item.id}>
                              <td id="id">{item.id}</td>
                              <td>{item.name}</td>
                              <td id="center">
                                <button
                                  type="button"
                                  onClick={() => this.edit(item)}
                                >
                                  ✏
                                </button>
                              </td>
                              <td id="center">
                                <DeleteCategoryButton item={item} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="4">
                              <div className="links">
                                <PaginationCategory page={page} />
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </Table>
                    </>
                  )}
                  {!showList && (
                    <FormCategory
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
CategoryList.propTypes = { page: PropTypes.number };
export default CategoryList;
export { ALL_CATEGORIES_QUERY_PAGINATION };
