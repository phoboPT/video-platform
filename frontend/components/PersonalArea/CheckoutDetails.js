import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import calcTotalPrice from "../../lib/calcTotalPrice";
import formatMoney from "../../lib/formatMoney";
import User from "../Authentication/User";
import Checkout from "./Checkout";
import CheckoutItems from "./CheckoutItems";

const Main = styled.div`
  max-width: 1300px;
  background-color: #fff;
  margin: 40px auto 0 auto;
  line-height: 1.65;
  padding: 20px 50px;
  display: flex;
  /* border: 1px solid red; */
  position: relative;

  .cartItems {
    flex: 2;
    order: 1;
    /* border: 1px solid blue; */
    float: left;
    position: relative;

    top .items {
      /* border: 1px solid green; */
    }
  }

  .cartDetails {
    margin-left: 20px;
    float: right;
    flex: 1;
    /* border: 1px solid orange; */
    order: 2;
    position: relative;
    padding-top: 15px;
  }
`;

const Button = styled.button`
  width: auto;
  background: red;
  color: white;
  border: 0;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  text-align: center;

  &:hover {
    background-color: #eb675e;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

export class CheckoutDetails extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <>
              <Main>
                <div className="cartItems">
                  <h3>Total {me.cart.length} items in your cart </h3>
                  <div className="items" />
                  {me.cart.map(item => (
                    <CheckoutItems cartItem={item} key={item.id} />
                  ))}
                </div>
                <div className="cartDetails">
                  <span> Total: </span>
                  <h1>{formatMoney(calcTotalPrice(me.cart))}</h1>
                  <Checkout>
                    <Button>Finish purchase</Button>
                  </Checkout>
                </div>
              </Main>
            </>
          );
        }}
      </User>
    );
  }
}

export default CheckoutDetails;
