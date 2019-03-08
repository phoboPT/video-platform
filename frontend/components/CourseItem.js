import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import ItemStyles from "./styles/ItemStyles";
import styled from "styled-components";

const InfoStyle = styled.p`
  text-align: left;
`;

export class Course extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired
  };

  render() {
    const { course } = this.props;
    return (
      <ItemStyles>
        <Link
          href={{
            pathname: "/course",
            query: { id: course.id }
          }}
        >
          <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
        </Link>
        <InfoStyle>{course.description}</InfoStyle>
        <InfoStyle>{course.price}</InfoStyle>
      </ItemStyles>
    );
  }
}

export default Course;
