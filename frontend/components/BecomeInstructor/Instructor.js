import React, { Component } from 'react';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import InstructorForm from './InstructorForm';
import RequestItem from './RequestItem';

const CREATE_INSTRUCTOR_MUTATION = gql`
  mutation CREATE_INSTRUCTOR_MUTATION($message: String!) {
    createInstructor(message: $message) {
      id
    }
  }
`;
const ALL_PEDIDOS_QUERY = gql`
  query ALL_PEDIDOS_QUERY {
    pedidoInstructor {
      id
      message
      state
    }
  }
`;

const Container = styled.div`
  #banner {
    width: 90%;
    margin: auto;
    img {
      width: 100%;
    }
  }
  #content {
    margin: auto;
    width: 90%;
    h2 {
      margin-top: 3rem;
      width: 100%;
      text-align: center;
    }
    #flex {
      display: flex;
      div {
        margin-top: 3rem;
        width: 33%;
        #img-container {
          width: 70px;
          margin: auto;
          img {
            width: 70px;
          }
        }
        p {
          color: rgba(0, 0, 0, 0.7);
          text-align: center;
        }
      }
    }
  }
  #page-footer {
    border-top: 2px solid #d1d1d1;
    width: 90%;
    margin: 4rem auto auto auto;
    display: flex;
    #left {
      order: 1;
      flex: 1;
      h3 {
        text-align: center;
      }
      p {
        margin-top: 2rem;
        margin-left: 3rem;
      }
    }
    #right {
      order: 2;
      flex: 1;
      padding-left: 4rem;
      #message-wait {
        width: 100%;
        text-align: center;
        font-size: 14px;
        margin-top: 4rem;
      }
      button {
        cursor: pointer;
        background: #49a361;
        height: 60px;
        width: 200px;
        font-size: 16px;
        color: white;
        border: none;
        border-radius: 3px;
        margin: 5rem auto auto 25rem;
      }
    }
  }
  #pedidos {
    margin: 10rem auto auto auto;
    width: 90%;
    h2 {
      margin-left: 3rem;
    }
  }
`;

class Instructor extends Component {
  state = {
    message: '',
  };

  handleChange = async e => {
    await this.setState({ message: e.target.value });
  };

  render() {
    const { message } = this.state;
    return (
      <Mutation mutation={CREATE_INSTRUCTOR_MUTATION} variables={this.state}>
        {(createInstructor, { error }) => {
          if (error) return <p>Something went Wrong</p>;
          return (
            <Query query={ALL_PEDIDOS_QUERY}>
              {({ data, error }) => {
                console.log(data);
                if (error) return <p>Something went Wrong</p>;
                return (
                  <Container>
                    <div id="banner">
                      <img
                        alt="banner"
                        src="../../static/becomeInstructor.svg"
                      />
                    </div>
                    <div id="content">
                      <h2>Share your knowledge with everyone</h2>
                      <div id="flex">
                        <div>
                          <div id="img-container">
                            <img alt="Earn" src="../../static/earn.png" />
                          </div>
                          <p>Earn some extra Money</p>
                        </div>
                        <div>
                          <div id="img-container">
                            <img alt="Earn" src="../../static/help.png" />
                          </div>
                          <p>Help People to improve their knowledge</p>
                        </div>
                        <div>
                          <div id="img-container">
                            <img alt="Earn" src="../../static/success.png" />
                          </div>
                          <p>Expand your success</p>
                        </div>
                      </div>
                      <div id="page-footer">
                        <div id="left">
                          <h3>Here We can Help You!</h3>
                          <p>Custom Course Creation! </p>
                          <p>
                            Interest System to improve the visibility of your
                            course!{' '}
                          </p>
                          <p>More Rating = More Students</p>
                        </div>
                        <div id="right">
                          {data.pedidoInstructor[
                            data.pedidoInstructor.length - 1
                          ].state !== 'PENDING' ? (
                            <button
                              type="button"
                              onClick={() =>
                                swal({
                                  text: `Become an Instructor`,
                                  buttons: {
                                    cancel: 'Cancel',
                                    ok: 'OK',
                                  },
                                  content: (
                                    <InstructorForm
                                      handleChange={this.handleChange}
                                      message={message}
                                    />
                                  ),
                                }).then(willDelete => {
                                  if (!willDelete) {
                                    console.log('cancel');
                                  } else {
                                    createInstructor();
                                  }
                                })
                              }
                            >
                              Become an Instructor
                            </button>
                          ) : (
                            <p id="message-wait">Wait for the Response!</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {data.pedidoInstructor.length > 0 && (
                      <div id="pedidos">
                        <h2>Instructor Requests</h2>
                        {data.pedidoInstructor.map(item => (
                          <RequestItem item={item} key={item.id} />
                        ))}
                      </div>
                    )}
                  </Container>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

export default Instructor;
