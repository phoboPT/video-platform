import React, { Component } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import formatDate from '../../../lib/formatDate';
import formatMoney from '../../../lib/formatMoney';

const BackButton = styled.div`
  padding-left: 6rem;
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

const TopBar = styled.div`
  display: flex;
  #title {
    padding-top: 2rem;
    text-align: left;
    order: 2;
    flex: 1;
    margin: auto 2rem;
  }
  #logo {
    width: 130px;
    height: 50px;
    margin: 2rem 2rem auto auto;
    transform: skew(-7deg);
    background: red;
    order: 2;
    img {
      margin: 1rem auto auto 1.5rem;
    }
  }
`;
const SelledStyle = styled.div`
  display: flex;
  margin: 2rem;
  border-bottom: 1px solid rgba(168, 168, 168, 0.6);
  strong {
    font-size: 15px;
    opacity: 1;
    color: rgba(0, 0, 0, 1);
    margin-right: 7px;
  }
  #left {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.8);
    order: 1;
    flex: 1;
    float: left;
  }
  #right {
    color: rgba(0, 0, 0, 0.8);

    font-size: 13px;
    order: 2;
  }
`;

const Container = styled.div`
  margin: 0rem 2rem 2rem 2rem;

  #all {
    border-top: 2px solid rgba(168, 168, 168, 0.6);
    border-bottom: 2px solid rgba(168, 168, 168, 0.6);
    display: flex;
    width: 100%;
    opacity: 0.8;
    font-size: 14px;
    #item {
      margin-left: 1rem;
      order: 1;
      flex: 3;
      display: flex;
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
    margin-left: 3rem;
    order: 1;
    width: 70%;
    text-align: left;
  }
  #price {
    order: 2;
    width: 30%;
    text-align: center;
  }
`;

const ContainerAll = styled.div`
  border: 1px solid #aaaaaa;
  max-width: 800px;
  margin: 2rem auto auto auto;
  #sub {
    margin-left: 2rem;
    opacity: 0.6;
    font-size: 12px;
  }
`;
const InfoDown = styled.div`
  display: flex;
  margin: 2rem;
  p {
    border-bottom: 1px solid #3e4040;
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
const ExportButton = styled.div`
  text-align: right;
  margin: 2rem auto;
  max-width: 800px;

  button {
    height: 35px;
    font-size: 15px;
    width: 150px;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    &:hover {
      background: #f7f7f7;
    }
  }
`;

class Receipt extends Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.JsPDF = require('jspdf');
    }
  }

  printDocument = () => {
    const { JsPDF } = this;
    const { data, idReceipt } = this.props;
    const receipt = data.ordersUser.filter(item => item.id === idReceipt);
    const input = document.getElementById('receipt');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new JsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save(`Receipt_${formatDate(receipt[0].createdAt)}.pdf`);
    });
  };

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
        <ContainerAll id="receipt">
          <TopBar>
            <h1 id="title">Picus Video Platform</h1>
            <a id="logo">
              <img alt="logo" src="/static/logo.webp" />
            </a>
          </TopBar>
          <p id="sub">Largo de São Domingos 52 1º </p>
          <p id="sub">Viana do Castelo - Portugal </p>
          <p id="sub">picusVideoPlatform.com </p>
          <SelledStyle>
            <p id="left">
              <strong>Selled to:</strong>
              {receipt[0].user.name}
            </p>
            <p id="right">
              <strong>Purchase date:</strong>
              {formatDate(receipt[0].createdAt)}
            </p>
          </SelledStyle>
          <Table>
            <p id="item">Item</p>
            <p id="price"> Price</p>
          </Table>

          <Container>
            {receipt[0].items.map(item => (
              <div id="all" key={item.id}>
                <div id="item">
                  <p> {item.title}</p>
                </div>
                <p id="price"> {item.price}€ </p>
              </div>
            ))}
          </Container>
          <InfoDown>
            <div id="quantity">
              <p> Total purchases: {receipt[0].items.length} </p>
            </div>
            <div id="price">
              <p> Total Price: {formatMoney(receipt[0].total / 100)} </p>
            </div>
          </InfoDown>
        </ContainerAll>

        <ExportButton>
          <button type="button" onClick={this.printDocument}>
            Export to Pdf
          </button>
        </ExportButton>
      </>
    );
  }
}

export default Receipt;
