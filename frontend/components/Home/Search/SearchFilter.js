import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { ALL_CATEGORIES_QUERY } from '../../InstructorArea/FormCourse/FormCourse';
import Loading from '../../Static/Loading';
import Error from '../../Static/ErrorMessage';
import SearchList from './SearchList';
import { orderBy, sort } from '../../../lib/filterVariables';

const PageContainer = styled.div`
  h1 {
    margin: 0 0 4rem 0;
    width: 100%;
    text-align: center;
  }
  #text {
    color: rgba(0, 0, 0, 0.9);
  }

  #select-bar {
    display: flex;
    #container-categories {
      order: 1;
      width: 75%;
      display: block;
      margin-bottom: 5rem;

      #categories {
        color: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-row-gap: 2rem;
        .item {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-row-gap: 2rem;

          margin: 0 1rem 0 0;

          input {
            margin: auto 1rem;
            -ms-transform: scale(1.5); /* IE */
            -moz-transform: scale(1.5); /* FF */
            -webkit-transform: scale(1.5); /* Safari and Chrome */
            -o-transform: scale(1.5); /* Opera */
            transform: scale(1.5);
            padding: 10px;
          }
        }
      }
    }

    #container-orders {
      width: 25%;
      order: 2;
      display: block;
      margin-bottom: 5rem;
      padding-left: 4rem;
      border-left: 1px solid lightgray;
      #orders {
        display: flex;

        .item {
          display: flex;
          margin: 0 1rem 0 0;
          select {
            color: #5b5b5b;
            border-radius: 3px;
            -webkit-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.15);
            -moz-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.15);
            box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.15);
            height: 35px;
            width: 110px;
            border: none;
          }
          input {
            margin: auto 1rem;
            -ms-transform: scale(1.5); /* IE */
            -moz-transform: scale(1.5); /* FF */
            -webkit-transform: scale(1.5); /* Safari and Chrome */
            -o-transform: scale(1.5); /* Opera */
            transform: scale(1.5);
            padding: 10px;
          }
        }
      }
      .tooltip {
        padding-top: 1rem;
        list-style: none;
        position: relative;
      }
      .tooltip:before,
      .tooltip:after {
        display: block;
        opacity: 0;
        pointer-events: none;
        position: absolute;
      }
      .tooltip:after {
        border-right: 6px solid transparent;
        border-bottom: 14px solid rgba(0, 0, 0, 0.75);
        border-left: 6px solid transparent;
        content: '';
        height: 0;
        top: 20px;
        left: 20px;
        width: 0;
      }
      .tooltip:before {
        background: rgba(0, 0, 0, 0.75);
        border-radius: 2px;
        color: #fff;
        content: attr(data-title);
        font-size: 14px;
        padding: 6px 10px;
        top: 26px;
        white-space: nowrap;
      }

      /* the animations */
      /* fade */
      .tooltip.fade:after,
      .tooltip.fade:before {
        transform: translate3d(0, -10px, 0);
        transition: all 0.15s ease-in-out;
      }
      .tooltip.fade:hover:after,
      .tooltip.fade:hover:before {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }
`;

class SearchFilter extends Component {
  state = {
    checked: {
      category: [],
      orderBy: 'createdAt',
      sort: 'ASC',
      author: 'teste',
    },
    isAll: false,
  };

  onChange = debounce(async e => {
    const {
      checked: { orderBy, category, sort },
    } = this.state;

    // turn loading on
    await this.setState({
      checked: {
        orderBy,
        category: [...category],
        sort,
        author: e.target.value,
      },
    });
  }, 300);

  changeCategory = async e => {
    const { sort, category, orderBy, author } = this.state.checked;

    const exist = category.filter(item => item === e.target.id)[0];
    if (exist) {
      const newState = category.filter(item => item !== e.target.id);

      await this.setState({
        checked: { sort, orderBy, category: newState, author },
      });
    } else {
      await this.setState({
        checked: {
          category: [...category, e.target.id],
          orderBy,
          sort,
          author,
        },
      });
    }
  };

  changeOrderBy = async e => {
    const {
      checked: { category, sort, author },
    } = this.state;

    await this.setState({
      checked: {
        orderBy: e.target.value,
        category: [...category],
        sort,
        author,
      },
    });
  };

  changeSort = async e => {
    const {
      checked: { orderBy, category, author },
    } = this.state;

    await this.setState({
      checked: {
        orderBy,
        category: [...category],
        sort: e.target.value,
        author,
      },
    });
  };

  selectAll = async array => {
    const {
      checked: { orderBy, author, sort },
      isAll,
    } = this.state;

    const newState = array.map(item => item.id);
    if (!isAll) {
      await this.setState({
        checked: {
          category: newState,
          orderBy,
          sort,
          author,
        },
        isAll: !this.state.isAll,
      });
    } else {
      await this.setState({
        checked: {
          category: [],
          orderBy,
          sort,
          author,
        },
        isAll: !this.state.isAll,
      });
    }
  };

  render() {
    const { checked, category, isAll } = this.state;
    return (
      <Query query={ALL_CATEGORIES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          if (!data) return <p>No Data</p>;
          return (
            <PageContainer>
              <h1>Custom Search</h1>
              <input
                id="author"
                placeholder="Select The Name of an Author"
                name="author"
                type="text"
                onChange={e => {
                  e.persist();
                  this.onChange(e);
                }}
              />
              SelectAll
              <input
                id="selectAll"
                placeholder="Author"
                name="selectAll"
                type="checkbox"
                checked={isAll}
                onChange={() => this.selectAll(data.categories)}
              />
              <div id="select-bar">
                <div id="container-categories">
                  <p id="text">Search By Category</p>
                  <div id="categories">
                    {data.categories.map(item => (
                      <div className="item" key={item.id}>
                        <input
                          id={item.id}
                          type="checkbox"
                          disabled={isAll}
                          onChange={this.changeCategory}
                        />

                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="container-orders">
                  <p id="text">Order By</p>
                  <div id="orders">
                    <div className="item">
                      <select
                        onChange={this.changeOrderBy}
                        disabled={category === []}
                      >
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
                          <li
                            className="tooltip fade"
                            data-title={
                              item === 'ASC'
                                ? 'Sort Ascendent'
                                : 'Sort Descendent'
                            }
                          >
                            <input
                              type="radio"
                              defaultChecked={checked.sort === item}
                              name="sort"
                              id="sort"
                              value={item}
                              onChange={this.changeSort}
                            />
                            {item === 'ASC' ? '⬆' : '⬇'}
                          </li>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="results">
                <SearchList info={checked} />
              </div>
            </PageContainer>
          );
        }}
      </Query>
    );
  }
}

export default SearchFilter;
