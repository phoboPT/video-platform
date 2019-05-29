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

const Title = styled.h1`
  padding-top: 2rem;
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
const ContainerAll = styled.div`
  border: 1px solid #aaaaaa;
  max-width: 800px;
  margin: 2rem auto auto auto;
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
              <p> Total courses purchased {receipt[0].items.length} </p>
            </div>
            <div id="price">
              <p> Total Price {formatMoney(receipt[0].total / 100)} </p>
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
