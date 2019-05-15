import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import Rating from '../CourseInfo/Comments/Rating';
import Container from '../../styles/CourseItemStyle';
import formatMoney from '../../../lib/formatMoney';

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
        <Container>
          <Link
            href={{
              pathname: '/course',
              query: { id: course.id },
            }}
          >
            <img alt="thumbnail" className="Thumbnail" src={course.thumbnail} />
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
              readOnly
              initialValue={
                Number.isNaN(course.totalRate / course.totalComments)
                  ? 0
                  : course.totalRate / course.totalComments
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
