import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import formatDate from '../../../lib/formatDate';
import formatString from '../../../lib/formatString';
import ItemStyles from '../../styles/ItemStyles';

const Div = styled.div`
  padding: none;
  span {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    line-height: 1.5;
    padding-top: 0.5rem;
    margin-left: 0.5rem;
    text-align: left;
  }

  img {
    margin: none;
    cursor: pointer;
  }
`;

// Adapting based on props
const State = styled.strong(props => ({
  background: props.background,
  color: props.color,
  padding: '0 0,5rem',
}));

class ListCourses extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    update: PropTypes.bool.isRequired,
  };

  render() {
    const { course } = this.props;

    return (
      <ItemStyles>
        <Div>
          {this.props.update ? (
            <Link
              href={{
                pathname: '/updateCourse',
                query: { id: course.id },
              }}
            >
              <img src={course.thumbnail} />
            </Link>
          ) : (
            <Link
              href={{
                pathname: '/course',
                query: { id: course.id },
              }}
            >
              <img src={course.thumbnail} />
            </Link>
          )}
          <br />
          <span>
            Title: <State id="title">{formatString(course.title, 20)}</State>
          </span>

          <span>
            Category: <State id="category">{course.category.name} </State>
          </span>
          {this.props.update && (
            <span>
              State:
              <State
                background={course.state === 'Published' ? 'green' : 'red'}
                color="white"
                id="state"
              >
                {course.state}
              </State>
            </span>
          )}
          <span>
            <p>hi</p>
            Created at:
            <State id="createdAt">{formatDate(course.createdAt)}</State>
          </span>
          {this.props.update && (
            <span>
              Price: <State id="price">{course.price} €</State>
            </span>
          )}
        </Div>
      </ItemStyles>
    );
  }
}

export default ListCourses;
