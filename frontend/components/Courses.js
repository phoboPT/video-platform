import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Video from "./Video";
import styled from "styled-components";
import User from "./User";
import Link from "next/link";
import Videos from "./Videos";

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
`;

const Center = styled.div`
  text-align: center;
`;

class Courses extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <>
              <Center>
                <h1>Courses</h1>
              </Center>
              {me.permission[0] === "INSTRUTOR" && (
                <LinkStyle>
                  <div className="grid-container">
                    <div className="item1">
                      <>
                        <div>
                          <Link href="/createCourse">
                            <a>Create Course</a>
                          </Link>
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
                      Here will be the List of my courses
                    </div>
                  </div>
                </LinkStyle>
              )}
              {me.permission[0] === "USER" && (
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
          </>
        )}
      </User>
    );
  }
}

export default Courses;
