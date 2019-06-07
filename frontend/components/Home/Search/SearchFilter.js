import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { ALL_CATEGORIES_QUERY } from '../../InstructorArea/FormCourse/FormCourse';
import Loading from '../../Static/Loading';
import Error from '../../Static/ErrorMessage';
import SearchList from './SearchList';
import { orderBy, sort } from '../../../lib/filterVariables';

const Container = styled.div`
  display: flex;
  margin-bottom: 5rem;
  .item {
    display: flex;
    margin: 0 1rem 0 1rem;

    input {
      margin: auto 1rem;
      /* Double-sized Checkboxes */
      -ms-transform: scale(1.5); /* IE */
      -moz-transform: scale(1.5); /* FF */
      -webkit-transform: scale(1.5); /* Safari and Chrome */
      -o-transform: scale(1.5); /* Opera */
      transform: scale(1.5);
      padding: 10px;
    }
  }
`;

class SearchFilter extends Component {
  state = { checked: { category: [], orderBy: 'createdAt', sort: 'ASC' } };

  changeCategory = async e => {
    const { sort, category, orderBy } = this.state.checked;

    const exist = category.filter(item => item === e.target.id)[0];
    if (exist) {
      const newState = category.filter(item => item !== e.target.id);

      await this.setState({
        checked: { sort, orderBy, category: newState },
      });
    } else {
      await this.setState({
        checked: {
          category: [...category, e.target.id],
          orderBy,
          sort,
        },
      });
    }
  };

  changeOrderBy = async e => {
    const {
      checked: { category, sort },
    } = this.state;

    await this.setState({
      checked: {
        orderBy: e.target.value,
        category: [...category],
        sort,
      },
    });
  };

  changeSort = async e => {
    const {
      checked: { orderBy, category },
    } = this.state;

    await this.setState({
      checked: {
        orderBy,
        category: [...category],
        sort: e.target.value,
      },
    });
  };

  render() {
    const { checked } = this.state;
    return (
      <Query query={ALL_CATEGORIES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          if (!data) return <p>No Data</p>;
          return (
            <>
              <h1>Search</h1>
              <h3>Search By Category</h3>
              <Container>
                {data.categories.map(item => (
                  <div className="item" key={item.id}>
                    <input
                      id={item.id}
                      type="checkbox"
                      onChange={this.changeCategory}
                    />

                    <p>{item.name}</p>
                  </div>
                ))}
              </Container>
              <h3>Order By</h3>
              <Container>
                <div className="item">
                  <select onChange={this.changeOrderBy}>
                    <option value="a" disabled hidden>
                      Order By
                    </option>

                    {Object.entries(orderBy).map(item => (
                      <option key={item[0]} value={`${item[1]}`}>
                        {item[0]}
                      </option>
                    ))}
                  </select>
                </div>
                {sort.map(item => (
                  <Fragment key={item}>
                    <div className="item">
                      <input
                        type="radio"
                        defaultChecked={checked.sort === item}
                        name="sort"
                        value={item}
                        onChange={this.changeSort}
                      />
                      {item === 'DESC' ? '⬆' : '⬇'}
                    </div>
                  </Fragment>
                ))}
              </Container>
              <div className="results">
                <SearchList info={checked} />
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

export default SearchFilter;
