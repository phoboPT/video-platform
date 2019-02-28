import React, { Component } from "react";
import User from "../Authentication/User";
import styled from "styled-components";

const Style = styled.p`
  padding-left: 15rem;
  a {
    color: #56595b !important;
  }
`;

export class Information extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Style>
              <img src="https://www.iamlivingit.com/front/images/user-img.jpg" />
              <p>
                Id User: <a>{me.id}</a>
              </p>
              <p>
                Nome: <a>{me.name}</a>
              </p>
              <p>
                Email: <a>{me.email}</a>
              </p>
            </Style>
          </>
        )}
      </User>
    );
  }
}

export default Information;
