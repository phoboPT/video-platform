import React, { Component } from "react";
import UserCourses from "../UserCourses";
import User from "../User";
import ListCourses from "./ListCourses";
const MyCourses = () => (
  <>
    <UserCourses>
      {({ data: { coursesUser } }) => {
        return <ListCourses data={coursesUser} />;
      }}
    </UserCourses>
  </>
);

export default MyCourses;
