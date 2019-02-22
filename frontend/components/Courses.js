import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Video from "./Video";
import styled from "styled-components";
import User from "./User";
import Link from "next/link";
import Videos from "./Videos";
import CreateCourse from "./CreateCourse";

const LinkStyle = styled.div`
  background-color: ${props => props.theme.black};
  .item1 {
    grid-area: menu;
  }
  .item2 {
    grid-area: main;
  }
  .grid-container {
    display: grid;
    grid-template-areas: "menu main main main main main main main";
    grid-gap: 2px;
    padding: 2px;
  }
  .grid-container > div {
    background-color: ${props => props.theme.white};
    text-align: center;
    padding: 20px 0;
    font-size: 20px;
  }
  a {
    margin: 20px;
    text-align: center;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    /*border is optional*/
    cursor: pointer;
  }
`;

const Button = styled.button``;

const Center = styled.div`
  text-align: center;
`;

class Courses extends Component {
  state = {
    createState: 0
  };

  showCreateCourse = e => {
    console.log(`1 ${e.target.id}`);
    this.setState({ createState: parseInt(e.target.id) });
    console.log(`2 ${this.state.createState}`);
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Center>
              <h1>Courses</h1>
            </Center>
            {me.permission[0] !== "INSTRUTOR" && (
              <LinkStyle>
                <div className="grid-container">
                  <div className="item1">
                    <>
                      <div>
                        <button id="1" onClick={this.showCreateCourse}>
                          Create Course
                        </button>
                      </div>
                      <div>
                        <Link href="/uploadVideo">
                          <a>Upload Videos</a>
                        </Link>
                      </div>
                      <div>
                        <Link href="/videos">
                          <a>My Videos</a>
                        </Link>
                      </div>
                    </>
                  </div>
                  <div className="item2">
                    {this.state.createState === 1 ? (
                      <CreateCourse />
                    ) : (
                      <p>Courses</p>
                    )}
                  </div>
                </div>
              </LinkStyle>
            )}
            {me.permission[0] !== "USER" && (
              <LinkStyle>
                <div className="grid-container">
                  <div className="item1">
                    <>
                      <Link href="/videos">
                        <a>Finished</a>
                      </Link>
                    </>
                  </div>
                  <div className="item2">
                    <Videos>{this.props.children}</Videos>
                  </div>
                </div>
              </LinkStyle>
            )}
          </>
        )}
      </User>
    );
  }
}

export default Courses;
