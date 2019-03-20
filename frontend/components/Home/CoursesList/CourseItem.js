import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import Item from "../../styles/ItemStyles";
import ItemStyles from "../../styles/ItemStyles";
import AddToCart from "../Cart/AddToCart";
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
            <img className="Thumbnail" src={course.thumbnail} />
          </Link>
          <InfoStyle>{course.title}</InfoStyle>
          <span>{course.user.name}</span>
          <InfoStyle className="price">{course.price} €</InfoStyle>

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
