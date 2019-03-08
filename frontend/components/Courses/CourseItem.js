import React, { Component } from "react";
import PropTypes from "prop-types";
import ItemStyles from "../styles/ItemStyles";
import Title from "../styles/Title";
import Link from "next/link";
import styled from "styled-components";
import formatDate from "../../lib/formatDate";
import formatString from "../../lib/formatString";

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
  strong {
  }
`;

// Adapting based on props
const State = styled.strong(props => ({
  background: props.background,
  color: props.color,
  padding: "0 0,5rem"
}));

class ListCourses extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired
  };
  render() {
    const { course } = this.props;

    return (
      <ItemStyles>
        <Div>
          <Title>
            <Link
              href={{
                pathname: "/updateCourse",
                query: { id: course.id }
              }}
            >
              <a>{course.title}</a>
            </Link>
          </Title>
          <Link
            href={{
              pathname: "/updateCourse",
              query: { id: course.id }
            }}
          >
            <a>
              <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
            </a>
          </Link>
          <br />
          <span>
            Description: <State>{formatString(course.description, 20)}</State>
          </span>
          <span>
            Thumbnail: <State>{course.thumbnail}</State>
          </span>
          <span>
            State:
            <State
              background={course.state === "Published" ? "green" : "red"}
              color="white"
            >
              {course.state}
            </State>
          </span>
          <span>
            Created at: <State>{formatDate(course.createdAt)}</State>
          </span>
          <span>
            Price: <State>{course.price} €</State>
          </span>
        </Div>
      </ItemStyles>
    );
  }
}

export default ListCourses;
