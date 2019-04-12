import React, { Component } from 'react';
import styled from 'styled-components';
import User from '../Authentication/User';

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
            <img src="https://www.iamlivingit.com/front/images/user-img.jpg" />
            <Style>
              Id User: <a>{me.id}</a>
            </Style>
            <Style>
              Nome: <a>{me.name}</a>
            </Style>
            <Style>
              Email: <a>{me.email}</a>
            </Style>
          </>
        )}
      </User>
    );
  }
}

export default Information;
