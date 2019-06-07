import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';
import BuyFreeButton from '../Home/BuyFreeButton';
import AddToCart from '../Home/Cart/AddToCart';
import Rating from '../Home/CourseInfo/Comments/Rating';
import ItemStyles from '../styles/ItemStyles';
import DeleteItemWishList from './DeleteItemWishList';

const InfoStyle = styled.p`
  text-align: left;
  padding: none;
`;

class WishItem extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    skip: PropTypes.number,
  };

  state = {
    ...this.props.course.user,
    buttonToShow: 0,
    courseId: this.props.course.id,
  };

  render() {
    const { course, skip, refetch } = this.props;
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

          <InfoStyle>{course.title}</InfoStyle>
          <span>{course.user.name}</span>
          {course.price === 0 ? (
            <InfoStyle className="price">Free Course</InfoStyle>
          ) : (
            <InfoStyle className="price">{formatMoney(course.price)}</InfoStyle>
          )}

          <div className="rating">
            <Rating
              readOnly
              initialValue={course.totalRate || 0}
              totalComments={course.totalComments}
              showTotal
            />
          </div>
          <div className="buttonList">
            {course.price === 0 ? (
              <BuyFreeButton id={course.id} skip={skip} />
            ) : (
              <AddToCart id={course.id} />
            )}
            <DeleteItemWishList id={course.id} refetch={refetch} skip={skip} />
            <p />
          </div>
        </ItemStyles>
      </>
    );
  }
}

export default WishItem;
