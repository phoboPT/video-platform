import React, { Component } from 'react';
import requestState from '../../../lib/requestStates';

export default class FormInstrutor extends Component {
  render() {
    return (
      <div>
        <h2>Response</h2>
        <select id="category" defaultValue="a" onChange={this.handleChange}>
          <option value="a" disabled hidden>
            State
          </option>

          {requestState.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <br />
        <br />
        <p>Response</p>

        <textarea name="response" id="response" cols="100" rows="20" />
      </div>
    );
  }
}
