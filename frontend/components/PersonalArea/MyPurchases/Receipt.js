import React, { Component } from 'react';
import styled from 'styled-components';
import formatDate from '../../../lib/formatDate';
import formatMoney from '../../../lib/formatMoney';

const BackButton = styled.div`
  margin: 2rem;
  button {
    font-size: 16px;
    cursor: pointer;
    background: none;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
`;
const SelledStyle = styled.div`
  margin: 2rem;
  border-top: 1px solid rgba(168, 168, 168, 0.6);
  border-bottom: 1px solid rgba(168, 168, 168, 0.6);
`;

const Container = styled.div`
  margin: 0rem 2rem 2rem 2rem;

  #all {
    border-top: 2px solid rgba(168, 168, 168, 0.6);
    border-bottom: 2px solid rgba(168, 168, 168, 0.6);
    display: flex;
    width: 100%;
    #item {
      order: 1;
      flex: 3;
      display: flex;
      border-right: 2px solid rgba(168, 168, 168, 0.6);
    }
    #price {
      order: 2;
      flex: 1;
      text-align: center;
    }
  }
`;

const Table = styled.div`
  display: flex;
  #item {
    order: 1;
    flex: 1;
    text-align: center;
  }
  #price {
    order: 2;
    flex: 1;
    text-align: center;
  }
`;
const H2 = styled.h3`
  text-align: center;
`;
const InfoDown = styled.div`
  display: flex;
  margin: 2rem;
  p {
    border-width: 2px;
    border-style: double;
    border-color: #3e4040;
    text-align: center;
    width: 60%;
  }
  #price {
    order: 2;
    flex: 1;
  }
  #quantity {
    order: 1;
    flex: 2;
  }
`;

class Receipt extends Component {
  render() {
    const { changeReceipt, data, idReceipt } = this.props;
    const receipt = data.ordersUser.filter(item => item.id === idReceipt);
    return (
      <>
        <BackButton>
          <button type="button" onClick={() => changeReceipt('', 1)}>
            ⬅ Go Back
          </button>
        </BackButton>
        <Title>Receipt</Title>
        <SelledStyle>
          <p>Selled to {receipt[0].user.name}</p>
          <p>Purchase date {formatDate(receipt[0].createdAt)} </p>
        </SelledStyle>
        <H2> Purchase Contents </H2>
        <Table>
          <p id="item">Item</p>
          <p id="price"> Price</p>
        </Table>

        <Container>
          {receipt[0].items.map((item, index) => (
            <div id="all" key={item.id}>
              <div id="item">
                <p id="index">{index + 1}. </p>
                <p>{item.title}</p>
              </div>
              <p id="price"> {item.price}€ </p>
            </div>
          ))}
        </Container>
        <InfoDown>
          <div id="quantity">
            <p> Total courses purchased {receipt[0].items.length} </p>{' '}
          </div>
          <div id="price">
            <p> Total Price {formatMoney(receipt[0].total / 100)} </p>
          </div>
        </InfoDown>
      </>
    );
  }
}

export default Receipt;
