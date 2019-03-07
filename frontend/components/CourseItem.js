import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import formatMoney from "../lib/formatMoney";

export class Course extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired
  };

  render() {
    const { course } = this.props;
    return (
      <ItemStyles>
        <Link
          href={{
            pathname: "/course",
            query: { id: course.id }
          }}
        >
          <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
        </Link>
        <p>{course.description}</p>
        <p>{formatMoney(course.price)}</p>
      </ItemStyles>
    );
  }
}

export default Course;
