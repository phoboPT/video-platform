import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import styled from 'styled-components';
import formatString from '../../lib/formatString';
import Container from '../styles/CourseItemStyle';
import calcProgress from '../../lib/calcProgress';
import Rating from '../Home/CourseInfo/Comments/Rating';
import formatMoney from '../../lib/formatMoney';

const ToolTip = styled.div`
  .tooltip {
    list-style: none;
    position: relative;
  }
  .tooltip:before,
  .tooltip:after {
    display: block;
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }
  .tooltip:after {
    border-right: 6px solid transparent;
    border-bottom: 14px solid rgba(0, 0, 0, 0.75);
    border-left: 6px solid transparent;
    content: '';
    height: 0;
    left: 100px;
    width: 0;
  }
  .tooltip:before {
    background: rgba(0, 0, 0, 0.75);
    border-radius: 2px;
    color: #fff;
    content: attr(data-title);
    font-size: 14px;
    padding: 6px 10px;
    top: 48px;
    white-space: nowrap;
  }

  /* the animations */
  /* fade */
  .tooltip.fade:after,
  .tooltip.fade:before {
    transform: translate3d(0, -10px, 0);
    transition: all 0.15s ease-in-out;
  }
  .tooltip.fade:hover:after,
  .tooltip.fade:hover:before {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

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
            query: { id: data.id },
          }}
        >
          <img alt={data.title} src={data.thumbnail} />
        </Link>

        <div id="title-card">
          {data.title.length > 24 ? (
            <ToolTip>
              <li className="tooltip fade" data-title={data.title}>
                <p>{formatString(data.title, 25)}</p>
              </li>
            </ToolTip>
          ) : (
            <p>{data.title}</p>
          )}
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
