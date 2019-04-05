import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import formatMoney from "../../../lib/formatMoney";
import BuyFreeButton from "../../Home/BuyFreeButton";
import AddToCart from "../../Home/Cart/AddToCart";
import Rating from "../../Home/CourseInfo/Comments/Rating";
import ItemStyles from "../../styles/ItemStyles";

const InfoStyle = styled.p`
  text-align: left;
  padding: none;
`;

export class WishItem extends Component {
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
          {course.price === 0 ? (
            <InfoStyle className="price">Free Course</InfoStyle>
          ) : (
            <InfoStyle className="price">{formatMoney(course.price)}</InfoStyle>
          )}

          <div className="rating">
            <Rating
              readOnly={true}
              initialValue={course.totalRate / course.totalComments}
              totalComments={course.totalComments}
              showTotal={true}
            />
          </div>
          <div className="buttonList">
            {course.price === 0 ? (
              <BuyFreeButton id={course.id} skip={this.props.skip} />
            ) : (
              <AddToCart id={course.id} />
            )}
            <p />
          </div>
        </ItemStyles>
      </>
    );
  }
}

export default WishItem;
