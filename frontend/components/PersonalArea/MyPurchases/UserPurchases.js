import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PurchaseItem from './PurchaseItem';
import Header from './Header';
import Receipt from './Receipt';

const ALL_USER_ORDERS = gql`
  query ALL_USER_ORDERS {
    ordersUser {
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
    }
  }
`;
const Container = styled.div`
  margin-left: 3rem;
  margin-top: 20px;
`;

class UserPurchases extends Component {
  state = {
    view: 1,
    idReceipt: '',
  };

  changeReceipt = (idReceipt, view) => {
    this.setState({
      view,
      idReceipt,
    });
  };

  render() {
    const { view, idReceipt } = this.state;
    return (
      <Query query={ALL_USER_ORDERS}>
        {({ data, error, loading }) => {
          if (loading) {
            return <p> Loading... </p>;
          }
          if (error) {
            return <p> Error: {error.message} </p>;
          }

          return (
            <>
              {view === 1 && (
                <Header data={data}>
                  <Container>
                    {data.ordersUser &&
                      data.ordersUser.map(order => (
                        <PurchaseItem
                          changeReceipt={this.changeReceipt}
                          order={order}
                          key={order.id}
                        />
                      ))}
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
    );
  }
}

export default UserPurchases;
