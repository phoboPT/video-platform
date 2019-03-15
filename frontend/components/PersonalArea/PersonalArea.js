import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import LinkStyle from "../styles/LinkStyle";
import User from "../Authentication/User";
import Information from "./Information";
import FormUser from "./FormUser";
import FormPassword from "./FormPassword";
import Interest from "./Interests/Interest";

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
  button :hover {
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
    view: 1
  };

  // This method will be sent to the child component

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
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
                    <button id="1" onClick={this.changeView}>
                      Account Information
                    </button>
                    <button id="2" onClick={this.changeView}>
                      Change Informations
                    </button>
                    <button id="3" onClick={this.changeView}>
                      Change Password
                    </button>
                    <button id="4" onClick={this.changeView}>
                      Customize your Interests
                    </button>
                  </section>
                  <aside id="sidebar">
                    {this.state.view === 1 && <Information />}
                    {this.state.view === 2 && <FormUser />}
                    {this.state.view === 3 && <FormPassword />}
                    {this.state.view === 4 && <Interest />}
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
