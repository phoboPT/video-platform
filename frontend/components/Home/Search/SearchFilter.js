import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { ALL_CATEGORIES_QUERY } from '../../InstructorArea/FormCourse/FormCourse';
import Loading from '../../Static/Loading';
import Error from '../../Static/ErrorMessage';
import SearchList from './SearchList';

const Container = styled.div`
  display: flex;
  margin-bottom: 10rem;
  .item {
    display: flex;
    margin: 0 1rem 0 1rem;

    input {
      margin: auto 1rem;
      width: 25px;
      height: 25px;
      -moz-appearance: none;
    }
  }
`;
const CardsList = styled.div`
  display: flex;
`;

class SearchFilter extends Component {
  state = { checked: [] };

  changeChecked = async e => {
    const { checked } = this.state;

    const exist = checked.filter(item => item === e.target.id)[0];
    if (exist) {
      const newState = checked.filter(item => item !== e.target.id);

      await this.setState({ checked: newState });
    } else {
      await this.setState({ checked: [...checked, e.target.id] });
    }
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
              <h2>Search By Category</h2>
              <Container>
                {data.categories.map(item => (
                  <div className="item" key={item.id}>
                    <input
                      id={item.id}
                      type="checkbox"
                      onChange={this.changeChecked}
                    />

                    <p>{item.name}</p>
                  </div>
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
