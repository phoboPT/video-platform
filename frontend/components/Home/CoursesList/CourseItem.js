import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import formatMoney from '../../../lib/formatMoney';
import User from '../../Authentication/User';
import BuyFreeButton from '../BuyFreeButton';
import AddToCart from '../Cart/AddToCart';
import Rating from '../CourseInfo/Comments/Rating';
import WishButton from '../WishButton';
import Container from '../../styles/CourseItemStyle';

class CourseItem extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
  };

  state = {
    ...this.props.course.user,
    buttonToShow: 0,
    courseId: this.props.course.id,
  };

  render() {
    const { course, skip } = this.props;
    return (
      <User>
        {({ data: { me } }) => {
          // Check if user has logged in or not
          if (!me) return null;

          return (
            <>
              <Container>
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
                <br />
                <div id="title-card">
                  <p>{course.title}</p>
                </div>
                <div id="instructor-card">
                  <p>{course.user.name}</p>
                </div>

                <div id="rating">
                  <Rating
                    showTotal
                    readOnly
                    initialValue={
                      Number.isNaN(course.totalRate / course.totalComments)
                        ? 0
                        : course.totalRate / course.totalComments
                    }
                    totalComments={course.totalComments || 0}
                  />
                </div>
                <div id="price-card">
                  <p>
                    {course.price === 0
                      ? 'Free Course'
                      : formatMoney(course.price)}
                  </p>
                </div>

                <div id="buttonList">
                  {course.price === 0 ? (
                    <BuyFreeButton id={course.id} skip={skip} />
                  ) : (
                    <AddToCart id={course.id} />
                  )}

                  {course.price !== 0 && (
                    <WishButton id={course.id} data={course} skip={skip} />
                  )}
                </div>
              </Container>
            </>
          );
        }}
      </User>
    );
  }
}

CourseItem.propTypes = {
  skip: PropTypes.number.isRequired,
};

export default CourseItem;
