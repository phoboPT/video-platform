import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import formatMoney from '../../../lib/formatMoney';
import formatString from '../../../lib/formatString';
import User from '../../Authentication/User';
import BuyFreeButton from '../BuyFreeButton';
import AddToCart from '../Cart/AddToCart';
import Rating from '../CourseInfo/Comments/Rating';
import WishButton from '../WishButton';
import Container from '../../styles/CourseItemStyle';
import ToolTip from '../../styles/ToolTip';

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
        {({ data: { me }, loading }) => {
          if (loading) return <p>loading</p>;

          // Check if user has logged in or not
          if (!me) return null;
          if (me)
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
                    {course.title.length > 24 ? (
                      <ToolTip>
                        <li className="tooltip fade" data-title={course.title}>
                          <p>{formatString(course.title, 25)}</p>
                        </li>
                      </ToolTip>
                    ) : (
                      <p>{course.title}</p>
                    )}
                  </div>
                  <div id="instructor-card">
                    <p>{course.user.name}</p>
                  </div>

                  <div id="rating">
                    <Rating
                      showTotal
                      readOnly
                      initialValue={
                        Number.isNaN(course.totalRate) ? 0 : course.totalRate
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
                  {me.permission[0] !== 'ADMIN' && (
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
                  )}
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
  course: PropTypes.object.isRequired,
};

export default CourseItem;
