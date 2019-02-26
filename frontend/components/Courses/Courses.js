import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Video from "../Video";
import User from "../User";
import Link from "next/link";
import Videos from "../Videos";
import CreateCourse from "./CreateCourse";
import UploadVideo from "../UploadVideo";
import FormCourse from "./FormCourse";
import LinkStyle from "../styles/LinkStyle";
import styled from "styled-components";

const Button = styled.button`
  width: auto !important;
  background: red !important;
  color: white !important;
  border: 0 !important;
  font-size: 2rem !important;
  font-weight: 600 !important;
  padding: 0.5rem 1.2rem !important;
  text-align: center !important;
`;

class Courses extends Component {
  state = {
    createState: 0,
    uploadState: 0,
    videosState: 0,
    title: "",
    description: ""
  };

  saveToState = (e, info) => {
    this.setState({ [info.target.name]: info.target.value });
  };

  createCourse = e => {
    this.setState({ createState: parseInt(e.target.id) });
    this.setState({ uploadState: 0 });
    this.setState({ videosState: 0 });
  };
  uploadVideo = e => {
    this.setState({ uploadState: parseInt(e.target.id) });
    this.setState({ createState: 0 });
    this.setState({ videosState: 0 });
  };
  videosState = e => {
    this.setState({ uploadState: 0 });
    this.setState({ createState: 0 });
    this.setState({ videosState: parseInt(e.target.id) });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            {me.permission[0] !== "INSTRUTOR" && (
              <LinkStyle>
                <div className="container">
                  <section id="main">
                    <div>
                      <button id="1" onClick={this.createCourse}>
                        Create Course
                      </button>
                    </div>
                    <div>
                      <button id="1" onClick={this.uploadVideo}>
                        Upload Video
                      </button>
                    </div>
                    <div>
                      <button id="1" onClick={this.videosState}>
                        My Videos
                      </button>
                    </div>
                  </section>
                  <aside id="sidebar">
                    {this.state.createState === 1 && (
                      <FormCourse
                        saveToState={this.saveToState}
                        state={this.state}
                      >
                        <Button id="2" onClick={this.createCourse}>
                          Next
                        </Button>
                      </FormCourse>
                    )}
                    {this.state.createState === 2 && (
                      <CreateCourse page={this.props.page} state={this.state} />
                    )}
                    {this.state.uploadState === 1 && <UploadVideo />}
                    {this.state.videosState === 1 && (
                      <Videos page={this.props.page} />
                    )}
                  </aside>
                </div>
              </LinkStyle>
            )}
            {me.permission[0] !== "USER" && (
              <LinkStyle>
                <div className="grid-container">
                  <div className="left">
                    <>
                      <Link href="/videos">
                        <a>Finished</a>
                      </Link>
                    </>
                  </div>
                  <div className="right">
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