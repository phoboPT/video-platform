import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ButtonStyle } from '../../styles/GoBackAdminButton';
import FormInstrutor from './FormInstrutor';

const Container = styled.div`
  display: flex;
  .info {
    order: 1;
    flex: 1;
  }
  .form {
    display: block;
    order: 2;
    flex: 1;
  }
`;

export class ShowInstrutor extends Component {
  render() {
    const { item, changePage, skip, refetch } = this.props;
    return (
      <Container>
        <div className="info">
          <h2>Details</h2>
          <ButtonStyle type="button" onClick={changePage}>
            ⬅ Go Back
          </ButtonStyle>

          <p> Request ID: {item.id}</p>
          <p>Name: {item.user.name}</p>
          <p>User ID: {item.user.id}</p>
          <p>State: {item.state || 'None'}</p>
          <p>Message: {item.message}</p>
          <p>Response: {item.response || ''}</p>
          <p>Created at: {item.createdAt}</p>
          <p>Updated at: {item.updatedAt}</p>
        </div>
        <div className="form">
          <FormInstrutor
            item={item}
            skip={skip}
            refetch={refetch}
            changePage={changePage}
          />
        </div>
      </Container>
    );
  }
}

ShowInstrutor.propTypes = {
  item: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  skip: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ShowInstrutor;
