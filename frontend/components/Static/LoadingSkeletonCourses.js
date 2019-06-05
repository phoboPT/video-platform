import styled from 'styled-components';
import { Container, CoursesList, Title } from '../styles/Home';
import CourseItemPlaceholder from '../Home/CoursesList/CourseItemPlaceholder';

// const Animation = styled.div`
//   animation: ${props =>
//     props.loading ? '' : ` ${StartAnimation} 1s forwards linear`};
// `;

const LoadingSkeletonCourses = () => (
  <Container>
    <Title>. . . . . .</Title>
    <div id="content-container">
      <CoursesList id="courses-list">
        <CourseItemPlaceholder />
        <CourseItemPlaceholder />
        <CourseItemPlaceholder />
        <CourseItemPlaceholder />
        <CourseItemPlaceholder />
      </CoursesList>
    </div>
  </Container>
);

export default LoadingSkeletonCourses;
