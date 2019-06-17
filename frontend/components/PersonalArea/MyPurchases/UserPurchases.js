import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PurchaseItem from './PurchaseItem';
import Header from './Header';
import Receipt from './Receipt';
import { Button } from '../../Home/CourseInfo/Comments/ListComments';

const ALL_USER_ORDERS = gql`
  query ALL_USER_ORDERS($skip: Int = 0, $first: Int = 7) {
    ordersUser(first: $first, skip: $skip) {
      id
      total
      items {
        id
        title
        price
        thumbnail
      }
      createdAt
      user {
        id
        name
      }
      paymentBill {
        id
        address
        city
        state
        zipCode
        nif
        country {
          id
          name
        }
      }
    }
  }
`;

const ALL_USER_ORDERS_STATS = gql`
  query ALL_USER_ORDERS_STATS {
    ordersUserStats {
      countOrders
      amountOrders
    }
  }
`;

const Container = styled.div`
  margin-left: 3rem;
  margin-top: 20px;

  #see-more {
    text-align: center;
    button {
      height: 25px;
      width: 150px;
      border-radius: 2px;
      background: #3469ba;
      color: white;
      border: #537fc1;
      cursor: pointer;
      font-size: 16px;
    }
  }
  button:focus {
    outline: none;
  }
`;

class UserPurchases extends Component {
  state = {
    view: 1,
    idReceipt: '',
    skip: 0,
  };

  componentDidMount = () => {
    window.onscroll = () => {
      this.scrollFunction();
    };
  };

  changeReceipt = (idReceipt, view) => {
    this.setState({
      view,
      idReceipt,
    });
  };

  scrollFunction = () => {
    try {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        document.getElementById('myBtn').style.display = 'block';
      } else {
        document.getElementById('myBtn').style.display = 'none';
      }
    } catch (error) {
      // console.warn(error);
    }
  };

  topFunction = () => {
    document.body.scrollTop = 150;
    document.documentElement.scrollTop = 150;
  };

  seeMore = async seeMore => {
    const { skip } = this.state;
    await this.setState({ skip: skip + 1 });

    seeMore({
      variables: {
        skip: this.state.skip * 7,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          ordersUser: [...prev.ordersUser, ...fetchMoreResult.ordersUser],
        });
      },
    });
  };

  render() {
    const { view, idReceipt } = this.state;
    return (
      <Query query={ALL_USER_ORDERS_STATS}>
        {({ data: statsData }) => (
          <Query query={ALL_USER_ORDERS}>
            {({ data, error, loading, fetchMore }) => {
              if (loading) {
                return <p> Loading... </p>;
              }
              if (error) {
                return <p> Error: {error.message} </p>;
              }
              if (!data.ordersUser) {
                return <p> No Orders </p>;
              }
              return (
                <>
                  {view === 1 && (
                    <Header data={statsData}>
                      <Container>
                        {data.ordersUser !== null &&
                          data.ordersUser.map(order => (
                            <PurchaseItem
                              changeReceipt={this.changeReceipt}
                              order={order}
                              key={order.id}
                            />
                          ))}
                        {data.ordersUser.length <
                          statsData.ordersUserStats.countOrders && (
                          <>
                            <div id="see-more">
                              <button
                                type="button"
                                onClick={() => this.seeMore(fetchMore)}
                              >
                                SHOW MORE
                              </button>
                            </div>
                          </>
                        )}
                        <Button>
                          <button
                            type="button"
                            id="myBtn"
                            onClick={this.topFunction}
                            name="go to the top of the page"
                          >
                            Go Top
                          </button>
                        </Button>
                        {!data.ordersUser && <p> No Orders </p>}
                      </Container>
                    </Header>
                  )}
                  {view === 2 && (
                    <Receipt
                      data={data}
                      changeReceipt={this.changeReceipt}
                      idReceipt={idReceipt}
                    />
                  )}
                </>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }
}

export default UserPurchases;
