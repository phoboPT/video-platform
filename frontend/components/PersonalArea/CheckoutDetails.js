import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import swal from '@sweetalert/with-react';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatMoney from '../../lib/formatMoney';
import User from '../Authentication/User';
import Checkout from './Checkout';
import CheckoutItems from './CheckoutItems';
import Paypal from './Paypal';
import ReceiptForm from './ReceiptForm';

const PAYMENT_BILL_QUERY = gql`
  query PAYMENT_BILL_QUERY {
    paymentBill {
      id
      name
      email
      address
      city
      state
      zipCode
      country {
        name
      }
    }
  }
`;

const ALL_COUNTRIES_QUERY = gql`
  query ALL_COUNTRIES_QUERY {
    countries {
      id
      name
    }
  }
`;
const Title = styled.div`
  text-align: center;
  display: flex;
  max-width: 60%;
  margin: auto;

  #border-top {
    border-radius: 2px;
    margin-top: 1.3rem;
    background: #e0e0e0;
    -moz-box-shadow: 0 0 2px #ccc;
    -webkit-box-shadow: 0 0 2px #ccc;
    box-shadow: 0 0 2px #ccc;
    width: 110px;
    height: 5px;
  }
  #active {
    span {
      color: blue;
    }
    h4 {
      color: blue;
    }
  }
  #visited {
    color: green;
    i {
    }
  }
  .item {
    display: flex;
    margin: auto;
    .dot {
      padding-top: 8px;
      height: 30px;
      width: 30px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
    }
    #checked {
      font-size: 3rem;
      color: green;
    }
    h4 {
      padding: 0 0 0 10px;
      margin: auto;
    }
  }
`;
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
    margin: auto;
    /* border: 1px solid blue; */
    float: left;
    position: relative;

    top .items {
      /* border: 1px solid green; */
    }
    .container {
      box-shadow: 1px 1px 1px 1px lightgrey;
      margin: 0 0 1rem 0;
      .item {
        display: flex;
        margin: 0 0 0 0;
        label {
          display: flex;
        }
        input {
          margin: auto 0 auto 1rem;
        }
        p {
          margin: auto 0 auto 1rem;
          font-size: 1.5rem;
        }
      }
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
    .container {
      box-shadow: 1px 1px 1px 1px lightgrey;
      margin: 0 0 1rem 0;
      .item {
        display: flex;
        margin: 0 0 0 0;
        input {
          margin: auto 0 auto 1rem;
        }
        p {
          margin: auto 0 auto 1rem;
          font-size: 1.5rem;
        }
      }
    }
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
  min-width: 15rem;

  &:hover {
    background-color: #eb675e;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

class CheckoutDetails extends Component {
  state = { view: 1, showReceiptForm: false, selectedBill: '' };

  changeView = async () => {
    const {
      view,
      selectedBill,
      name,
      email,
      address,
      city,
      state,
      zipCode,
      country,
    } = this.state;
    console.log(this.isEmpty());

    if (view !== 2) {
      return this.setState({ view: view + 1 });
    }
    if (view === 2) {
      if (selectedBill !== '') {
        localStorage.setItem(
          'billData',
          JSON.stringify({
            data: {
              name,
              email,
              address,
              city,
              state,
              zipCode,
              country,
              selectedBill,
            },
          })
        );
        return this.setState({ view: view + 1 });
      }

      if (this.isEmpty()) {
        localStorage.setItem(
          'billData',
          JSON.stringify({
            name,
            email,
            address,
            city,
            state,
            zipCode,
            country,
          })
        );
        return this.setState({ view: view + 1 });
      }
      swal(
        'Empty Fields',
        'You need to select a payment bill or create a new one',
        'info'
      );
    }
  };

  isEmpty = () => {
    const { name, email, address, city, state, zipCode, country } = this.state;

    if (
      name !== undefined &&
      email !== undefined &&
      address !== undefined &&
      city !== undefined &&
      state !== undefined &&
      zipCode !== undefined
    ) {
      return true;
    }

    return false;
  };

  updateData = data => {
    this.setState(data);
  };

  changePayment = e => {
    this.setState({ selectedBill: e.target.value });
  };

  render() {
    const {
      selectedBill,
      view,
      showReceiptForm,
      name,
      email,
      address,
      city,
      state,
      zipCode,
      country,
    } = this.state;
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) return <p>You should not be here!</p>;
          if (me) {
            return (
              <Query query={ALL_COUNTRIES_QUERY}>
                {({ data: countryData, loading }) => {
                  if (countryData)
                    return (
                      <Query query={PAYMENT_BILL_QUERY}>
                        {({ data, loading, error }) => {
                          if (data) {
                            return (
                              <>
                                <Title>
                                  <div
                                    className="item"
                                    id={view === 1 ? 'active' : ''}
                                  >
                                    <>
                                      {view <= 1 ? (
                                        <span className="dot">1</span>
                                      ) : (
                                        <i
                                          id="checked"
                                          className="fas fa-check-circle"
                                        />
                                      )}
                                      <h4 id={view > 1 ? 'visited' : ''}>
                                        Cart Review
                                      </h4>
                                    </>
                                  </div>
                                  <div />
                                  <div id="border-top" />
                                  <div
                                    className="item"
                                    id={view === 2 ? 'active' : ''}
                                  >
                                    <>
                                      {view <= 2 ? (
                                        <span className="dot">2</span>
                                      ) : (
                                        <i
                                          id="checked"
                                          className="fas fa-check-circle"
                                        />
                                      )}
                                      <h4 id={view > 2 ? 'visited' : ''}>
                                        Receipt Information
                                      </h4>
                                    </>
                                  </div>
                                  <div id="border-top" />
                                  <div
                                    className="item"
                                    id={view === 3 ? 'active' : ''}
                                  >
                                    <>
                                      {view <= 3 ? (
                                        <span className="dot">3</span>
                                      ) : (
                                        <i
                                          id="checked"
                                          className="fas fa-check-circle"
                                        />
                                      )}
                                      <h4 id={view > 3 ? 'visited' : ''}>
                                        Confirmation & Payment
                                      </h4>
                                    </>
                                  </div>
                                </Title>
                                <Main>
                                  <div className="cartItems">
                                    {view === 1 && (
                                      <>
                                        <h3>
                                          Total {me.cart.length} items in your
                                          cart{' '}
                                        </h3>
                                        <div className="items" />
                                        {me.cart.map(item => (
                                          <CheckoutItems
                                            cartItem={item}
                                            key={item.id}
                                          />
                                        ))}
                                      </>
                                    )}
                                    {view === 2 && (
                                      <>
                                        <div className="container">
                                          <p>
                                            Select one of the billing or create
                                            a new one
                                          </p>
                                          {data.paymentBill.map(item => (
                                            <div className="item" key={item.id}>
                                              <input
                                                id={item.id}
                                                type="radio"
                                                name="bill"
                                                onChange={this.changePayment}
                                                value={item.id}
                                              />
                                              <label htmlFor={item.id}>
                                                <p>{item.name}</p>
                                                <p>{item.email}</p>
                                                <p>{item.address || ''}</p>
                                                <p>{item.city}</p>
                                              </label>
                                            </div>
                                          ))}
                                          <button
                                            type="button"
                                            onClick={() =>
                                              swal({
                                                text: `Billing Info`,
                                                buttons: {
                                                  cancel: 'Cancel',
                                                  ok: 'OK',
                                                },
                                                content: (
                                                  <ReceiptForm
                                                    updateData={this.updateData}
                                                    countries={countryData}
                                                    name={name}
                                                    email={email}
                                                    address={address}
                                                    city={city}
                                                    state={state}
                                                    zipCode={zipCode}
                                                    country={country}
                                                  />
                                                ),
                                              }).then(willDelete => {
                                                if (!willDelete) {
                                                  console.log('exit');
                                                } else {
                                                  console.log('false');
                                                }
                                              })
                                            }
                                          >
                                            Add new billing info
                                          </button>
                                        </div>
                                      </>
                                    )

                                    // <>
                                    //   <ReceiptForm updateData={this.updateData} />
                                    // </>
                                    }
                                  </div>
                                  <div className="cartDetails">
                                    <span> Total: </span>
                                    <h1>
                                      {formatMoney(calcTotalPrice(me.cart))}
                                    </h1>

                                    {me.cart.length > 0 &&
                                      (view < 3 ? (
                                        <Button
                                          type="button"
                                          onClick={this.changeView}
                                        >
                                          Continue
                                        </Button>
                                      ) : (
                                        <>
                                          <Checkout
                                            data={this.state}
                                            selectedBill={selectedBill}
                                          >
                                            <Button>Stripe</Button>
                                          </Checkout>
                                          <br />
                                          <br />
                                          <Paypal
                                            data={this.state}
                                            selectedBill={selectedBill}
                                          />
                                        </>
                                      ))}
                                  </div>
                                </Main>
                              </>
                            );
                          }
                        }}
                      </Query>
                    );
                }}
              </Query>
            );
          }
        }}
      </User>
    );
  }
}

export default CheckoutDetails;
