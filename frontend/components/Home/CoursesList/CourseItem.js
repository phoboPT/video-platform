import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import ItemStyles from "../../styles/ItemStyles";
import styled from "styled-components";
import AddToCart from "./AddToCart";
import Item from "../../styles/ItemStyles";
const InfoStyle = styled.p`
  text-align: left;
  padding: none;
`;

export class Course extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
  };

  render() {
    const { course } = this.props;
    return (
      <>
        <ItemStyles>
          <Link
            href={{
              pathname: "/course",
              query: { id: course.id },
            }}
          >
            <img src={course.thumbnail} />
          </Link>
          <InfoStyle>{course.title}</InfoStyle>
          <InfoStyle className="price">{course.price} €</InfoStyle>
          <span>{course.user.name}</span>
          <div className="buttonList">
            <AddToCart id={course.id} />
            <p>5</p>
          </div>
        </ItemStyles>
      </>
    );
  }
}

export default Course;
