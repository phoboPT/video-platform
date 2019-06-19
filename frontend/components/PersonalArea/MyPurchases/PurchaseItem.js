import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatDate from '../../../lib/formatDate';
import Receipt from './Receipt';

const Container = styled.div`
  display: flex;

  border-top: 1px solid rgba(165, 165, 165, 0.5);

  img {
    order: 1;
    width: 80px;
    height: 80px;
  }
  #count {
    margin: auto auto auto 10px;
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
  #more {
    margin: auto;
    order: 5;
    flex: 1;
    button {
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        opacity: 0.2;
      }
    }
  }
`;

class PurchaseItem extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  };

  state = {
    view: 1,
  };

  render() {
    const { view } = this.state;
    const { order, changeReceipt } = this.props;

    if (view === 1) {
      return (
        <Container>
          <img alt="cart" src="../../../static/cart.webp" />
          <p id="count"> {order.items.length} purchased courses</p>
          <p id="data"> {formatDate(order.createdAt)} </p>
          <p id="total"> {order.total} €</p>
          <div id="more">
            <button type="button" onClick={() => changeReceipt(order.id, 2)}>
              Receipt
            </button>
          </div>
        </Container>
      );
    }
    return (
      <Container>
        <Receipt />
      </Container>
    );
  }
}

export default PurchaseItem;
