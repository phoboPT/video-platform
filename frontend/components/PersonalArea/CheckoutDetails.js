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
import validateNif from '../../lib/validateNif';

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
      nif
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
  max-width: 80%;
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
  background-color: #fff;
  margin: 40px auto 0 auto;
  line-height: 1.65;
  padding: 20px 50px;
  display: flex;
  position: relative;
  #billInfo {
    display: flex;
    .first {
      order: 1;
      flex: 1.5;
      #title {
        text-align: center;
      }
    }
    .second {
      order: 2;
      flex: 1;
      display: flex;
      #title {
        text-align: center;
      }
      #infoDetails {
        width: 100%;
      }
      .details {
        margin: 0 0.5rem 0 2rem;
        display: flex;
        p {
          padding: 0 0 0 1rem;
          color: grey;
          margin-block-start: 0em;
          margin-block-end: 0em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
        }
      }
    }
  }
  .cartItems {
    flex: 2;
    order: 1;
    margin: auto;
    float: left;
    position: relative;
    .container {
      box-shadow: 1px 1px 1px 1px lightgrey;
      margin: 0 0 1rem 0;
      .item {
        display: flex;
        margin: 0 0 0 0;
        label {
          cursor: pointer;
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
  state = {
    view: 1,
    showReceiptForm: false,
    selectedBill: '',
  };

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
      nif,
      country,
    } = this.state;

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
              nif,
              zipCode,
              country,
              selectedBill,
            },
          })
        );
        return this.setState({ view: view + 1 });
      }

      const fields = { name, email, address, city, state, nif, zipCode };

      let validatedFields = 0;

      Object.keys(fields).forEach(key => {
        const value = fields[key];
        if (this.isEmpty(value, key)) {
          validatedFields += 1;
        }
      });

      if (validatedFields === 7) {
        localStorage.setItem(
          'billData',
          JSON.stringify({
            name,
            email,
            address,
            city,
            state,
            nif,
            zipCode,
            country,
          })
        );
        return this.setState({ view: view + 1 });
      }
    }
  };

  isEmpty = (string, type) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check email
    if (type === 'email') {
      if (string === undefined || string === '') {
        swal(`Empty ${type}`, `The ${type} can't be empty`, 'info');
        return false;
      }
      if (!re.test(string.toLowerCase())) {
        swal(`Empty ${type}`, `The ${type} must be valid`, 'info');
        return false;
      }
      return true;
    }
    // check Nif
    if (type === 'nif') {
      if (string === undefined || string === '') {
        swal('Empty NIF', "The nif can't be empty", 'info');
        return false;
      }
      if (!validateNif(string)) {
        swal('Invalid NIF', 'The nif is invalid', 'info');
        return false;
      }
      return true;
    }
    // check state
    if (type === 'zipCode') {
      if (string === undefined || string === '') {
        swal('Empty Zip Code', "The zip code can't be empty", 'info');
        return false;
      }
      return true;
    }

    if (string === undefined || string === '') {
      swal(`Empty ${type}`, `The ${type} can't be empty`, 'info');
      return false;
    }

    return true;
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
      name,
      email,
      address,
      city,
      state,
      nif,
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
                {({ data: countryData }) => {
                  if (countryData)
                    return (
                      <Query query={PAYMENT_BILL_QUERY}>
                        {({ data }) => {
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
                                          cart
                                        </h3>
                                        {me.cart.map(item => (
                                          <CheckoutItems
                                            cartItem={item}
                                            key={item.id}
                                            showDelete
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
                                              <label>
                                                <input
                                                  id={item.id}
                                                  type="radio"
                                                  name="bill"
                                                  onChange={this.changePayment}
                                                  value={item.id}
                                                />
                                                <p>{item.name}</p>
                                                <p>{item.email}</p>
                                                <p>{item.address || ''}</p>
                                                <p>{item.city}</p>
                                                <p>{item.nif}</p>
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
                                                    nif={nif}
                                                    me={me}
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
                                    )}
                                    {view === 3 && (
                                      <div id="billInfo">
                                        <div className="first">
                                          <h3 id="title">Items</h3>
                                          {me.cart.map(item => (
                                            <CheckoutItems
                                              cartItem={item}
                                              key={item.id}
                                              length="40"
                                            />
                                          ))}
                                        </div>
                                        <div className="second">
                                          {!selectedBill && (
                                            <div id="infoDetails">
                                              <h3 id="title">Payment Bill</h3>
                                              <strong className="details">
                                                Name: <p>{name}</p>
                                              </strong>
                                              <strong className="details">
                                                Email: <p>{email}</p>
                                              </strong>
                                              <strong className="details">
                                                Address: <p>{address || ''}</p>
                                              </strong>
                                              <strong className="details">
                                                City: <p>{city}</p>
                                              </strong>
                                              <strong className="details">
                                                Nif: <p>{nif}</p>
                                              </strong>
                                            </div>
                                          )}
                                          {data.paymentBill.map(item => {
                                            console.log(item.id, selectedBill);
                                            if (item.id === selectedBill) {
                                              return (
                                                <div
                                                  id="infoDetails "
                                                  key={item.id}
                                                >
                                                  <h3 id="title">
                                                    Payment Bill
                                                  </h3>
                                                  <strong className="details">
                                                    Name: <p>{item.name}</p>
                                                  </strong>
                                                  <strong className="details">
                                                    Email: <p>{item.email}</p>
                                                  </strong>
                                                  <strong className="details">
                                                    Address:{' '}
                                                    <p>{item.address || ''}</p>
                                                  </strong>
                                                  <strong className="details">
                                                    City: <p>{item.city}</p>
                                                  </strong>
                                                  <strong className="details">
                                                    Nif: <p>{item.nif}</p>
                                                  </strong>
                                                </div>
                                              );
                                            }
                                          })}
                                        </div>
                                      </div>
                                    )}
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
