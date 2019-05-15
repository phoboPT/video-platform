import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import formatString from '../../lib/formatString';
import formatMoney from '../../lib/formatMoney';
import Rating from '../Home/CourseInfo/Comments/Rating';
import Container from '../styles/CourseItemStyle';

class ListCourses extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
  };

  render() {
    const { course, showInfo } = this.props;

    return (
      <Container>
        <Link
          href={{
            pathname: '/course',
            query: { id: course.id },
          }}
        >
          <img alt={course.title} src={course.thumbnail} />
        </Link>

        <br />
        <div id="title-card">
          <p>{formatString(course.title, 40)}</p>
        </div>

        <div id="instructor-card">
          <p>{course.user.name}</p>
        </div>
        {showInfo && (
          <>
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
                {course.price === 0 ? 'Free Course' : formatMoney(course.price)}
              </p>
            </div>
          </>
        )}
      </Container>
    );
  }
}

export default ListCourses;
