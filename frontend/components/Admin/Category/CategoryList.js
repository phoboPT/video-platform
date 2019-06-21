import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ALL_CATEGORIES_QUERY } from '../../InstructorArea/FormCourse/FormCourse';
import FormCategory from './FormCategory';

const Container = styled.div`
  h2 {
    text-align: left;
  }
  #button {
    text-align: right;
  }
  #saveButton {
    border-radius: 5px;
    height: 50px;
    width: 200px;
    text-align: center;
    margin: auto 2rem;
    font-size: 25px;
    font-weight: 400;
    border: none;
    background: #27ad39;
    cursor: pointer;
    color: white;
    :focus {
      outline: none;
    }
    :disabled {
      background: rgba(163, 163, 163, 0.5);
      cursor: not-allowed;
    }
  }
`;

const Table = styled.table`
  width: 80%;
  text-align: left;
  border-collapse: collapse;
  margin: 2rem auto 0 auto;
  #id {
    width: 30%;
  }
  #center {
    text-align: center;
  }
  td,
  th {
    border: 1px solid #aaaaaa;
    padding: 3px 2px;
  }
  tbody td {
    font-size: 13px;
  }
  tr:nth-child(even) {
  }
  thead {
    background: #1c6ea4;
    background: -moz-linear-gradient(
      top,
      #5592bb 0%,
      #327cad 66%,
      #1c6ea4 100%
    );
    background: -webkit-linear-gradient(
      top,
      #5592bb 0%,
      #327cad 66%,
      #1c6ea4 100%
    );
    background: linear-gradient(
      to bottom,
      #5592bb 0%,
      #327cad 66%,
      #1c6ea4 100%
    );
    border-bottom: 2px solid #444444;
  }
  thead th {
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
    border-left: 2px solid #d0e4f5;
  }
  thead th:first-child {
    border-left: none;
  }

  tfoot {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    background: #d0e4f5;
    background: -moz-linear-gradient(
      top,
      #dcebf7 0%,
      #d4e6f6 66%,
      #d0e4f5 100%
    );
    background: -webkit-linear-gradient(
      top,
      #dcebf7 0%,
      #d4e6f6 66%,
      #d0e4f5 100%
    );
    background: linear-gradient(
      to bottom,
      #dcebf7 0%,
      #d4e6f6 66%,
      #d0e4f5 100%
    );
    border-top: 2px solid #444444;
  }
  tfoot td {
    font-size: 14px;
  }
  tfoot .links {
    text-align: right;
  }
  tfoot .links a {
    display: inline-block;
    background: #1c6ea4;
    color: #ffffff;
    padding: 2px 8px;
    border-radius: 5px;
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
    const { showList, isEdit, item, changeShow } = this.state;
    // const { changePage } = this.props;
    return (
      <Query query={ALL_CATEGORIES_QUERY}>
        {({ data, loading, error, refetch }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;
          if (!data) return <p>No Data</p>;
          if (data)
            return (
              <>
                <Container>
                  <h2>Category's</h2>
                  {showList && (
                    <>
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
                              <td id="center">❎</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                  {!showList && (
                    <FormCategory
                      isEdit={isEdit}
                      item={item}
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
CategoryList.propTypes = {
  changePage: PropTypes.func,
};
export default CategoryList;
