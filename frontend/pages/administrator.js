import React from 'react';
import styled from 'styled-components';
import User from '../components/Authentication/User';
import AdminMenu from '../components/Admin/AdminMenu';

const Container = styled.div`
  h1 {
    text-align: center;
  }
  #imagem {
    width: 50%;
    margin: 10rem auto auto auto;
  }
`;
const Administrator = props => (
  <User>
    {({ data: { me }, loading, error }) => {
      if (loading) {
        return null;
      }
      if (!me) return <p>You can't be here</p>;
      if (me.permission[0] === 'ADMIN') {
        return (
          <>
            <AdminMenu />
            <Container>
              <h1>Welcome to the backoffice of the Video-Platform </h1>
              <div id="imagem">
                <img alt="backoffice" src="../static/backoffice.jpg" />
              </div>
            </Container>
          </>
        );
      }
      return <p>You can't be here</p>;
    }}
  </User>
);

export default Administrator;
