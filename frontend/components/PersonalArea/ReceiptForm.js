import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Form from '../styles/Form';

const Container = styled.div`
  width: 100%;
  margin: auto;

  select {
    -webkit-appearance: button;
    -webkit-border-radius: 2px;
    -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    -webkit-padding-end: 20px;
    -webkit-padding-start: 2px;
    -webkit-user-select: none;
    background-image: url(http://i62.tinypic.com/15xvbd5.png),
      -webkit-linear-gradient(#fafafa, #f4f4f4 40%, #e5e5e5);
    background-position: 97% center;
    background-repeat: no-repeat;
    border: 1px solid #aaa;
    color: #555;
    font-size: inherit;
    overflow: hidden;
    padding: 5px 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  #country-div {
    width: 80%;
    margin: auto;
  }
  input {
    -moz-box-shadow: 0 0 3px #c3c3c3;
    -webkit-box-shadow: 0 0 3px #c3c3c3;
    box-shadow: 0 0 3px #c3c3c3;
    padding-left: 4px;
    width: 100%;
    height: 35px;
    border-radius: 7px;
    border: none;
  }

  p {
    text-align: left;
    margin: 2rem 0 5px 0;
  }
  #top-text {
    color: #7c7c7c;
    font-size: 13px;
    margin-bottom: 2rem;
    margin-top: 0;
    padding-bottom: 8px;
    border-bottom: 2px solid lightgray;
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
          <p id="top-text">Enter your payment details below</p>

          <p>Name</p>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={name}
            onChange={this.handleChange}
          />
          <p>Email</p>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={email}
            onChange={this.handleChange}
          />
          <p>Address</p>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            defaultValue=""
            onChange={this.handleChange}
          />
          <p>City</p>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="City"
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
                placeholder="State"
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
                placeholder="Zip-code"
                defaultValue=""
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div id="country-div">
            <p>Country</p>
            <select name="country" id="country" onChange={this.handleChange}>
              {country.countries.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
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
