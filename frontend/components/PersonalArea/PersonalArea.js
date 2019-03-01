import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import LinkStyle from "../styles/LinkStyle";
import User from "../Authentication/User";
import Information from "./Information";
import FormUser from "./FormUser";
import FormPassword from "./FormPassword";

const Style = styled.div`
  button {
    color: #293a44;
    font: inherit;
    padding-block-end: 18px;
    /* border-block-end: 1px solid #d6dbe1; */
    /*border is optional*/
    cursor: pointer;
    width: auto;
    border: 0;
    text-align: center;
  }
  button:hover {
    background: #b8c7d1;
  }
  #main {
    width: 16%;
    margin-top: 25px;
    padding-right: 0px;
    padding-left: 55px;
  }

  #sidebar {
    width: 84%;
    border-left: 1.5px solid #959ba5;
  }
`;

class PersonalArea extends Component {
  state = {
    informationState: 1,
    changeInformationState: 0,
    changePasswordState: 0,
    userId: ""
  };

  // This method will be sent to the child component

  information = e => {
    this.setState({ informationState: parseInt(e.target.id) });
    this.setState({ changeInformationState: 0 });
    this.setState({ changePasswordState: 0 });
  };
  changeInformation = e => {
    this.setState({ informationState: 0 });
    this.setState({ changeInformationState: parseInt(e.target.id) });
    this.setState({ changePasswordState: 0 });
  };
  changePassword = e => {
    this.setState({ informationState: 0 });
    this.setState({ changeInformationState: 0 });
    this.setState({ changePasswordState: parseInt(e.target.id) });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            {me.permission[0] !== "Instructor" && (
              <LinkStyle>
                <Style>
                  <section id="main">
                    <button id="1" onClick={this.information}>
                      Account Information
                    </button>
                    <button id="2" onClick={this.changeInformation}>
                      Change Informations
                    </button>
                    <button id="3" onClick={this.changePassword}>
                      Change Password
                    </button>
                  </section>
                  <aside id="sidebar">
                    {this.state.informationState === 1 && <Information />}
                    {this.state.changeInformationState === 2 && <FormUser />}
                    {this.state.changePasswordState === 3 && <FormPassword />}
                  </aside>
                </Style>
              </LinkStyle>
            )}
          </>
        )}
      </User>
    );
  }
}

export default PersonalArea;
