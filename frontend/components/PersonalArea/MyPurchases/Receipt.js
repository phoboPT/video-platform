import React, { Component } from 'react';
import styled from 'styled-components';
import { userInfo } from 'os';

class Receipt extends Component {
  render() {
    const { changeReceipt, data, idReceipt } = this.props;
    const receipt = data.ordersUser.filter(item => item.id === idReceipt);
    return (
      <>
        <button type="button" onClick={() => changeReceipt('', 1)}>
          Back
        </button>
        <p>Selled to {receipt[0].user.name}</p>
        <p>Data de Compra{receipt[0].createdAt}</p>
        <p>Preço{receipt[0].total} </p>
        <p>Quantidade de Cursos{receipt[0].items.length}</p>

        {receipt[0].items.map(item => (
          <div key={item.id}>
            <p> item nome{item.title}</p>
            <img src={item.thumbnail} alt="item " />
          </div>
        ))}
      </>
    );
  }
}

export default Receipt;
