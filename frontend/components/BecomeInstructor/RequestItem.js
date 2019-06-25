import React, { Component } from 'react';
import styled from 'styled-components';

const Style = styled.div`
  margin-bottom: 1rem;
  margin-left: 1rem;
  border: 2px solid #afafaf;
  width: 50%;
  #response {
    padding-top: 1rem;
    display: flex;
    #message {
      padding-left: 2rem;
      width: 70%;
      color: rgba(0, 0, 0, 0.9);
    }
    #state {
      background: ${props => props.state === 'PENDING' && '#ff8a5b'};
      background: ${props => props.state === 'REJECTED' && 'red'};
      background: ${props => props.state === 'APPROVED' && 'green'};

      color: white;
      width: 30%;
      width: 150px;
      height: 20px;
      padding-top: 3px;
      text-align: center;
    }
  }
  #reason {
    margin: auto;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 90%;
    padding: 2rem;
    text-align: left;
  }
`;
class RequestItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <Style state={item.state}>
        <div id="response">
          <p id="message">{item.message}</p>
          <p id="state">{item.state}</p>
        </div>
        <p id="reason">
          Reason: ..............................................
        </p>
      </Style>
    );
  }
}

export default RequestItem;
