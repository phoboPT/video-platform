import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import formatMoney from '../../../lib/formatMoney';
import User from '../../Authentication/User';
import ItemStyles from '../../styles/ItemStyles';
import BuyFreeButton from '../BuyFreeButton';
import AddToCart from '../Cart/AddToCart';
import Rating from '../CourseInfo/Comments/Rating';
import WishButton from '../WishButton';

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
      <User>
        {({ data: { me } }) => {
          // Check if user has logged in or not
          if (!me) return null;

          return (
            <>
              <ItemStyles>
                <Link
                  href={{
                    pathname: '/course',
                    query: { id: course.id },
                  }}
                >
                  <img
                    alt={course.title}
                    className="Thumbnail"
                    src={course.thumbnail}
                  />
                </Link>
                <InfoStyle id="title">{course.title}</InfoStyle>
                <span id="user">{course.user.name}</span>
                {course.price === 0 ? (
                  <InfoStyle className="price" id="price">
                    Free Course
                  </InfoStyle>
                ) : (
                  <InfoStyle className="price" id="price">
                    {formatMoney(course.price)}
                  </InfoStyle>
                )}
                <div className="rating" id="rating">
                  <Rating
                    showTotal
                    readOnly
                    initialValue={
                      Number.isNaN(course.totalRate / course.totalComments)
                        ? 0
                        : course.totalRate / course.totalComments
                    }
                    totalComments={course.totalComments}
                  />
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
