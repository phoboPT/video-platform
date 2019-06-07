import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Rating from '../CourseInfo/Comments/Rating';
import Container from '../../styles/CourseItemStyle';
import formatMoney from '../../../lib/formatMoney';

export class CourseItem extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
  };

  render() {
    const { course } = this.props;
    return (
      <>
        <Container noCursor>
          <img alt="thumbnail" src={course.thumbnail} />
          <br />
          <div id="title-card">
            <p>{course.title}</p>
          </div>
          <div id="instructor-card">
            <p>{course.user.name}</p>
          </div>

          <div id="rating">
            <Rating
              readOnly
              initialValue={
                Number.isNaN(course.totalRate) ? 0 : course.totalRate
              }
              totalComments={course.totalComments || 0}
              showTotal
            />
          </div>
          <div id="price-card">
            <p>
              {course.price === 0 ? 'Free Course' : formatMoney(course.price)}
            </p>
          </div>
          <div id="buttonList">
            <Link href="/signup">
              <a>Add to Cart</a>
            </Link>
          </div>
        </Container>
      </>
    );
  }
}

export default CourseItem;
