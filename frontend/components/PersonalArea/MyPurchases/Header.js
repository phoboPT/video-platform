import React, { Component } from 'react';
import styled from 'styled-components';
import formatMoney from '../../../lib/formatMoney';

const Title = styled.h1`
  text-align: center;
`;
const Flex = styled.div`
  display: flex;
  margin-top: 3rem;
  margin-left: 5.5rem;
  #one {
    margin: auto;
    order: 1;
    flex: 1;
  }
  #two {
    margin: auto;
    order: 2;
    flex: 5;
  }
  #data {
    margin: auto;
    order: 3;
    flex: 2;
  }
  #total {
    margin: auto;
    order: 4;
    flex: 2;
  }
  #five {
    margin: auto;
    order: 5;
    flex: 1;
  }
`;

const FlexBottom = styled.div`
  display: flex;
  text-align: center;
  margin-top: 2rem;
  #items {
    order: 1;
    flex: 2;
  }

  #total {
    order: 2;
    flex: 2;
  }
`;
class Header extends Component {
  //   const amount = data.ordersUser.reduce((tally, item) => tally + item.total, 0);
  render() {
    const { data, children } = this.props;

    return (
      <>
        <Title> Purchases Historic </Title>
        <Flex>
          <p id="one"> </p>
          <p id="two"> </p>
          <p id="data"> Data</p>
          <p id="total"> Total Price </p>
          <p id="five" />
        </Flex>
        {children}
        <FlexBottom>
          <p id="items"> Total: {data.ordersUserStats.countOrders} </p>
          <p id="total">
            Total Spent: {formatMoney(data.ordersUserStats.amountOrders / 100)}
          </p>
        </FlexBottom>
      </>
    );
  }
}

export default Header;
