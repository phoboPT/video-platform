import React, { Component } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { perPageCategory } from '../../../config';
import { Container, Table } from '../../styles/AdminListStyle';
import FormInterest from './FormInterests';
import Pagination from './Pagination';
import DeleteInterestButton from './DeleteInterestButton';

const ALL_INTERESTS_QUERY_PAGINATION = gql`
  query ALL_INTERESTS_QUERY_PAGINATION ($skip:Int=0,$first:Int=${perPageCategory}){
    interests (first:$first,skip:$skip,orderBy:createdAt_ASC){
      name
      id
      thumbnail
    }
  }
`;

class InterestList extends Component {
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
      <div>
        <Query
          query={ALL_INTERESTS_QUERY_PAGINATION}
          variables={{
            skip: page * perPageCategory - perPageCategory,
          }}
        >
          {({ data, loading, error, refetch }) => {
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading</p>;
            if (!data) return <p>No Data</p>;
            console.log(data);
            if (data)
              return (
                <Container>
                  {showList && (
                    <>
                      <h2>Interests</h2>
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
                            <th>Thumbnail</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.interests.map(item => (
                            <tr key={item.id}>
                              <td id="id">{item.id}</td>
                              <td>{item.name}</td>
                              <td id="img">
                                <img
                                  height="70"
                                  src={item.thumbnail}
                                  alt="interest description"
                                />
                              </td>
                              <td id="center">
                                <button
                                  type="button"
                                  onClick={() => this.edit(item)}
                                >
                                  ✏
                                </button>
                              </td>
                              <td id="center">
                                <DeleteInterestButton item={item} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="5">
                              <div className="links">
                                <Pagination page={page} />
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </Table>
                    </>
                  )}
                  {!showList && (
                    <FormInterest
                      isEdit={isEdit}
                      item={isEdit ? item : null}
                      refetch={refetch}
                      changePage={this.changeShow}
                    />
                  )}
                </Container>
              );
          }}
        </Query>
      </div>
    );
  }
}
InterestList.propTypes = {
  page: PropTypes.number,
};
export default InterestList;
export { ALL_INTERESTS_QUERY_PAGINATION };
