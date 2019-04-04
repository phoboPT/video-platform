import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import formatMoney from "../../../lib/formatMoney";
import orderCourses from "../../../lib/orderCourses";
import User from "../../Authentication/User";
import ItemStyles from "../../styles/ItemStyles";
import BuyFreeButton from "../BuyFreeButton";
import AddToCart from "../Cart/AddToCart";
import Rating from "../CourseInfo/Comments/Rating";
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
    let { course } = this.props;
    return (
      <User>
        {({ data: { me } }) => {
          //Check if user has logged in or not
          if (!me) return null;

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
                {course.price === 0 ? (
                  <InfoStyle className="price">Free Course</InfoStyle>
                ) : (
                  <InfoStyle className="price">
                    {formatMoney(course.price)}
                  </InfoStyle>
                )}
                <div className="rating">
                  <Rating readOnly={true} initialValue="4" />
                </div>
                <div className="buttonList">
                  {course.price === 0 ? (
                    <BuyFreeButton id={course.id} skip={this.props.skip} />
                  ) : (
                    <AddToCart id={course.id} />
                  )}

                  <WishButton
                    id={course.id}
                    data={course}
                    skip={this.props.skip}
                  />
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
