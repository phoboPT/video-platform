import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import orderCourses from "../../../lib/orderCourses";
import User from "../../Authentication/User";
import ItemStyles from "../../styles/ItemStyles";
import AddToCart from "../Cart/AddToCart";
import WishButton from "../WishButton";

const InfoStyle = styled.p`
  text-align: left;
  padding: none;
`;

export class CourseItem extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
  };
  state = {
    ...this.props.course.user,
    buttonToShow: 0,
    courseId: this.props.course.id,
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
            <Link href="/signup">
              <a>Add to Cart</a>
            </Link>
            {/* <WishButton id={course.id} data={course} skip={this.props.skip} /> */}
            <p>5</p>
          </div>
        </ItemStyles>
      </>
    );
  }
}

export default CourseItem;
