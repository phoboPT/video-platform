import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Form from '../styles/Form';

const Container = styled.div`
  width: 100%;
  margin: auto;
  input,
  select {
    width: 100%;
  }
  p {
    text-align: left;
    margin: 1rem 0 5px 0;
  }
  .state {
    display: flex;

    input {
      width: 100%;
    }
    .first {
      order: 1;
      width: 50%;
      margin: auto;
      p {
        text-align: center;
      }

      input {
        width: 70%;
      }
    }
    .second {
      p {
        text-align: center;
      }

      margin: auto;
      input {
        width: 70%;
      }
      order: 2;
      width: 50%;
    }
  }
`;

class ReceiptForm extends Component {
  state = { hasUpdated: false };

  handleChange = async e => {
    const { updateData } = this.props;
    await this.setState({ [e.target.name]: e.target.value });
    updateData(this.state);
  };

  initialState = async (me, data) => {
    const { updateData } = this.props;
    await this.setState({
      name: me.name,
      email: me.email,
      country: data.countries[0].id,
      hasUpdated: true,
    });
    updateData(this.state);
  };

  render() {
    const { name, email } = this.state;
    const { country } = this.props;
    return (
      <Container>
        <form>
          <br />
          <p>Enter your payment details below</p>

          <p>Name</p>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="name"
            defaultValue={name}
            onChange={this.handleChange}
          />
          <p>Email</p>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="email"
            defaultValue={email}
            onChange={this.handleChange}
          />
          <p>Address</p>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="address"
            defaultValue=""
            onChange={this.handleChange}
          />
          <p>City</p>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="city"
            defaultValue=""
            onChange={this.handleChange}
          />
          <div className="state">
            <div className="first">
              <p>State</p>
              <input
                id="state"
                type="text"
                name="state"
                placeholder="state"
                defaultValue=""
                onChange={this.handleChange}
              />
            </div>
            <div className="second">
              <p>Zip-Code</p>
              <input
                id="zip-code"
                type="text"
                name="zipCode"
                placeholder="zip-code"
                defaultValue=""
                onChange={this.handleChange}
              />
            </div>
          </div>
          <p>Country</p>
          <select name="country" id="country" onChange={this.handleChange}>
            {country.countries.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </form>
      </Container>
    );
  }
}

ReceiptForm.propTypes = {
  updateData: PropTypes.func.isRequired,
  country: PropTypes.object.isRequired,
};

export default ReceiptForm;
