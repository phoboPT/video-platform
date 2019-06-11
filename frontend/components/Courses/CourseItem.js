import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import formatString from '../../lib/formatString';
import Container from '../styles/CourseItemStyle';
import calcProgress from '../../lib/calcProgress';
import Rating from '../Home/CourseInfo/Comments/Rating';
import formatMoney from '../../lib/formatMoney';

class CourseItem extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
  };

  state = {};

  componentDidMount() {
    const { course, showInfo } = this.props;
    if (!showInfo) {
      // MyCourses card
      const res = calcProgress(course, 1);
      this.setState(res);
    }
  }

  render() {
    const { percent, watched, total } = this.state;
    const { showInfo } = this.props;
    let data;
    if (showInfo) {
      data = this.props.course;
    } else {
      data = this.props.course.course;
    }
    return (
      <Container>
        <Link
          href={{
            pathname: '/video',
            query: { id: data.videos[0] || 0 },
          }}
        >
          <img alt={data.title} src={data.thumbnail} />
        </Link>

        <div id="title-card">
          <p>{formatString(data.title, 40)}</p>
        </div>

        <div id="instructor-card">
          <p>{data.user.name}</p>
        </div>
        {!showInfo && (
          <div id="rating">
            <Link
              href={{
                pathname: '/course',
                query: { id: data.id },
              }}
            >
              <img
                height="42"
                width="42"
                alt={data.title}
                src="../../../static/previewIcon.webp"
              />
            </Link>

            <div className="progress">
              <Progress type="circle" width={40} percent={parseInt(percent)} />
              <span>{` Watched (${watched}) Total (${total})`}</span>
            </div>
          </div>
        )}

        {showInfo && (
          <>
            <div id="rating">
              <Rating
                showTotal
                readOnly
                initialValue={Number.isNaN(data.totalRate) ? 0 : data.totalRate}
                totalComments={data.totalComments || 0}
              />
            </div>
            <div id="price-card">
              <p>
                {data.price === 0 ? 'Free Course' : formatMoney(data.price)}
              </p>
            </div>
          </>
        )}
      </Container>
    );
  }
}
CourseItem.propTypes = {
  showInfo: PropTypes.bool,
};
export default CourseItem;
