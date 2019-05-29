import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
// import swal from '@sweetalert/with-react';
import NProgress from 'nprogress';

const PAYPAL_CHECKOUT = gql`
  mutation PAYPAL_CHECKOUT {
    paypalCheckout {
      charge
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
class Paypal extends Component {
  submit = async mutation => {
    const res = await mutation();
    // const win = window.open(
    //   res.data.paypalCheckout.charge,
    //   'MsgWindow',
    //   'width=200,height=100,margin=auto'
    // );
    this.popupCenter(res.data.paypalCheckout.charge, 'PayPal', '900', '500');
    // win.focus();
  };

  popupCenter = (url, title, w, h) => {
    // Fixes dual-screen position                         Most browsers      Firefox
    const dualScreenLeft =
      window.screenLeft != undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop != undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `scrollbars=yes, width=1000, height=900, top=${top}, left=${left}`
    );

    // Puts focus on the newWindow
    if (window.focus) newWindow.focus();
  };

  render() {
    return (
      <Mutation mutation={PAYPAL_CHECKOUT}>
        {paypalCheckout => (
          <Button type="button" onClick={() => this.submit(paypalCheckout)}>
            PayPal
          </Button>
        )}
      </Mutation>
    );
  }
}

export default Paypal;
