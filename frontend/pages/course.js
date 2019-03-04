import React, { Component } from "react";
import ShowCourse from "../components/ShowCourse";
const CoursePage = ({ query }) => (
  <div>
    <ShowCourse id={query.id} />
  </div>
);

export default CoursePage;
