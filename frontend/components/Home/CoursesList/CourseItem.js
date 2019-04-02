import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import orderCourses from "../../../lib/orderCourses";
import User from "../../Authentication/User";
import ItemStyles from "../../styles/ItemStyles";
import AddToCart from "../Cart/AddToCart";
import WishButton from "../WishButton";
import BuyFreeButton from "../BuyFreeButton";

const InfoStyle = styled.p`
  text-align: left;
  padding: none;
`;

export class CourseItem extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired
  };
  state = {
    ...this.props.course.user,
    buttonToShow: 0,
    courseId: this.props.course.id
  };

  render() {
    let { course } = this.props;
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) return null;

          return (
            <>
              <ItemStyles>
                {course.wished ? "wished" : "not wished"}
                <Link
                  href={{
                    pathname: "/course",
                    query: { id: course.id }
                  }}
                >
                  <img className="Thumbnail" src={course.thumbnail} />
                </Link>
                <InfoStyle>{course.title}</InfoStyle>
                <span>{course.user.name}</span>
                {course.price === 0 ? (
                  <InfoStyle className="price">Free Course</InfoStyle>
                ) : (
                  <InfoStyle className="price">{course.price} €</InfoStyle>
                )}

                <div className="buttonList">
                  <AddToCart id={course.id} />

                  <WishButton
                    id={course.id}
                    data={course}
                    skip={this.props.skip}
                  />
                  <BuyFreeButton
                    id={course.id}
                    data={course}
                    skip={this.props.skip}
                  />
                  <p>5</p>
                </div>
              </ItemStyles>
            </>
          );
        }}
      </User>
    );
  }
}

export default CourseItem;
