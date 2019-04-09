import Link from "next/link";
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import Media from "../../Media";
import Update from "../Update/Update";

const CourseContainer = styled.div`
  color: black;
  background: #e3e3e5;
  display: flex;

  .info-container {
    order: 1;
    flex: 3;
    label {
      text-align: left;
    }
  }
  .actions-container {
    order: 2;
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    input {
      margin: 10px;
    }
    label {
      margin: 40px;
      img {
        margin-top: 10px;
        width: 100%;
        height: 80%;
      }
    }
    #submit {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin-top: 40px;
      margin: 0 auto;
      font-size: 25px;
      font-weight: 400;
      border: none;
      background: #27ad39;
      margin-top: 40px;
      cursor: pointer;
      color: white;
      :focus {
        outline: none;
      }
    }

    #submitLoading {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin-top: 40px;
      margin: 0 auto;
      font-size: 25px;
      font-weight: 400;
      border: 2px solid #727272;
      background: white;
      color: #727272;
      margin-top: 40px;
      cursor: pointer;
    }
  }

  #courseState {
    padding-top: 10px;
    padding-bottom: 10px;

    button {
      color: #3d3d3d;
      font-size: 17px;
      font-weight: 400;
      border: 1px solid #cccccc;
      background: #f7f7f7;
      cursor: pointer;
      position: relative;
    }
    button:hover {
      outline: none;
      background: #e5e5e5;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }

  img {
    max-height: 200px;
  }

  .description {
    background-color: lightgray;
  }
`;

const Marcador = styled.div`
  margin-top: 4rem;
  button {
    border: 2px solid black;
    border-bottom: 0;
    font-size: 22px;
    font-weight: 400;
    height: 50px;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
`;
export class UpdateCourse extends Component {
  state = { view: 1 };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
  };

  render() {
    return (
      <>
        <Link href="/courses">
          <a>&lt;- Go Back</a>
        </Link>
        <Marcador>
          <button id="1" onClick={this.changeView}>
            Info
          </button>
          <button id="2" onClick={this.changeView}>
            Media
          </button>
        </Marcador>
        <CourseContainer>
          {this.state.view === 1 && <Update id={this.props.id} />}
          {this.state.view === 2 && <Media />}
        </CourseContainer>
      </>
    );
  }
}

export default UpdateCourse;
