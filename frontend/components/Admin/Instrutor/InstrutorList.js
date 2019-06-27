import React, { Component } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query, ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import { perPageInstrutor } from '../../../config';
import { Container, Table } from '../../styles/AdminListStyle';
import ShowInstrutor from './ShowInstrutor';
import { ButtonStyle } from '../../styles/GoBackAdminButton';
import PaginationInstrutor from './PaginationInstrutor';
import formatString from '../../../lib/formatString';

import requestState from '../../../lib/requestStates';

const ALL_INSTRUTOR_QUERY_PAGINATION = gql`
  query ALL_INSTRUTOR_QUERY_PAGINATION ($skip:Int=0,$first:Int=${perPageInstrutor},$state:RequestState, $searchTerm:String){
    becomeInstructors (where: {state:$state, user:{name_contains:$searchTerm}},first:$first,skip:$skip,orderBy:createdAt_ASC){
     id
     message
     state
     response
     user{
        id
        name
     }
    createdAt
    updatedAt
    }
  }
`;

class InstrutorList extends Component {
  state = { showList: true, searchTerm: '' };

  handleChange = async e => {
    if (e.target.value === 'All') {
      await this.setState({ state: undefined });
    } else {
      await this.setState({ state: e.target.value });
    }
  };

  onChange = refetch => {
    const { name } = this.state;
    this.setState({ searchTerm: name });
    refetch();
  };

  change = e => {
    this.setState({ name: e.target.value });
  };

  changeShow = () => {
    const { showList } = this.state;
    this.setState({ showList: !showList, isEdit: false });
  };

  edit = async item => {
    const { showList } = this.state;
    await this.setState({ showList: !showList, isEdit: true, item });
  };

  render() {
    const { showList, isEdit, item, state, searchTerm, name } = this.state;
    const { page } = this.props;
    const skip = page * perPageInstrutor - perPageInstrutor;
    return (
      <Query
        query={ALL_INSTRUTOR_QUERY_PAGINATION}
        variables={{
          skip,
          state,
          searchTerm,
        }}
      >
        {({ data, loading, error, refetch }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;
          if (!data) return <p>No Data</p>;
          if (data)
            return (
              <Container>
                {showList && (
                  <>
                    <h2>Instructor</h2>
                    <br />
                    <br />
                    State: {'    '}
                    <select
                      id="category"
                      defaultValue="All"
                      onChange={this.handleChange}
                    >
                      <option value="All">All</option>

                      {requestState.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="name">
                      Name:{' '}
                      <input
                        id="name"
                        name="name"
                        placeholder="name"
                        type="text"
                        value={name}
                        onChange={this.change}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => this.onChange(refetch)}
                    >
                      Search
                    </button>
                    <Table className="tableInfo">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Message</th>
                          <th>Response</th>
                          <th>State</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.becomeInstructors.map(item => (
                          <tr key={item.id}>
                            <td id="id">{formatString(item.id, 25)}</td>
                            <td>{formatString(item.user.name, 25)}</td>
                            <td>{formatString(item.message, 25)}</td>
                            <td>{formatString(item.response || '', 25)}</td>
                            <td>{formatString(item.state, 25)}</td>
                            <td id="action">
                              <ButtonStyle
                                id="more"
                                type="button"
                                onClick={() => this.edit(item)}
                              >
                                <img
                                  height="35"
                                  src="../../static/previewIcon.webp"
                                  alt="preview icon"
                                />
                              </ButtonStyle>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="6">
                            <div className="links">
                              <PaginationInstrutor page={page} />
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </Table>
                  </>
                )}
                {!showList && (
                  <ShowInstrutor
                    skip={skip}
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
    );
  }
}
InstrutorList.propTypes = {
  page: PropTypes.number,
};
export default InstrutorList;
export { ALL_INSTRUTOR_QUERY_PAGINATION };
