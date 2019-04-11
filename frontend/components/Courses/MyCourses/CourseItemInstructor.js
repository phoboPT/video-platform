import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import formatDate from "../../../lib/formatDate";
import formatString from "../../../lib/formatString";
import ItemStyles from "../../styles/ItemStyles";

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
  }

  #bottom-bar {
    border-top: 1px solid black;
    margin: 0 auto;
    width: 80%;
    display: flex;
    #preview {
      flex: 1;
      order: 1;
    }
    #edit {
      order: 2;
      flex: 1;
    }

    #delete {
      flex: 1;
      order: 3;
    }
    img {
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
  }
`;

// Adapting based on props
const State = styled.strong(props => ({
  background: props.background,
  color: props.color,
  padding: "0 0,5rem"
}));

class CourseItemInstructor extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    update: PropTypes.bool.isRequired
  };
  render() {
    const { course } = this.props;

    return (
      <ItemStyles>
        <Div>
          <img src={course.thumbnail} />

          <br />
          <span>
            Title: <State id="title">{formatString(course.title, 20)}</State>
          </span>

          <span>
            Category: <State id="category">{course.category.name} </State>
          </span>

          <span>
            State:
            <State
              background={course.state === "Published" ? "green" : "red"}
              color="white"
              id="state"
            >
              {course.state}
            </State>
          </span>

          <span>
            Created at:
            <State id="createdAt">{formatDate(course.createdAt)}</State>
          </span>

          <span>
            Price: <State id="price">{course.price} €</State>
          </span>
          <div id="bottom-bar">
            <div id="preview">
              <Link
                href={{
                  pathname: "/course",
                  query: { id: course.id }
                }}
              >
                <img src="../../../static/previewIcon.png" />
              </Link>
            </div>
            <div id="edit">
              <Link
                href={{
                  pathname: "/updateCourse",
                  query: { id: course.id }
                }}
              >
                <img src="../../../static/editIcon.png" />
              </Link>
            </div>
            <div id="delete">
              <img src="../../../static/deleteIcon.png" />
            </div>
          </div>
        </Div>
      </ItemStyles>
    );
  }
}

export default CourseItemInstructor;
