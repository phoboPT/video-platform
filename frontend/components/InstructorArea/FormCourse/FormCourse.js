/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
// import ReactQuill from "react-quill"; // ES6
import styled, { keyframes } from 'styled-components';
import Error from '../../Static/ErrorMessage';
import Published from '../CourseState/Published';
import Unpublished from '../CourseState/Unpublished';
import Editor from '../Editor';
import SaveCourseButton from './SaveCourseButton';

const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      name
      id
    }
  }
`;

const Form = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
  }
  .ql-container {
    height: 250px;
  }
`;

class FormCourse extends Component {
  state = {
    alreadyExecuted: false,
    changeThumbnail: false,
    published: false,
    state: 'UNPUBLISHED',
    unpublished: true,
    once: false,
  };

  changePublished = () => {
    this.setState({
      published: !this.state.published,
      state: 'PUBLISHED',
      unpublished: !this.state.unpublished,
    });
  };

  changeUnpublished = () => {
    this.setState({
      published: !this.state.published,
      state: 'UNPUBLISHED',
      unpublished: !this.state.unpublished,
    });
  };

  courseState = actualState => {
    this.setState({
      alreadyExecuted: true,
      published: actualState === 'PUBLISHED',
      state: actualState,
      unpublished: actualState === 'UNPUBLISHED',
    });
  };

  handleChangeCategory = e => {
    this.setState({
      category: e.target.value,
    });
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  changeCourse = async (e, updateCourseMutation) => {
    e.preventDefault();

    await updateCourseMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  changeQuill = e => {
    this.setState({ description: e });
  };

  uploadThumbnail = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'thumbnail');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/deky2cxlm/image/upload',
      { method: 'POST', body: data }
    );

    const file = await res.json();
    this.setState({ changeThumbnail: true, thumbnail: file.secure_url });
  };

  render() {
    const { course, createCourse, id, changeToEdit } = this.props;
    const {
      alreadyExecuted,
      changeThumbnail,
      once,
      thumbnail,
      published,
      unpublished,
    } = this.state;

    if (!createCourse) {
      if (!alreadyExecuted) {
        this.courseState(course.state);
      }
    }

    if (!once) {
      if (createCourse) {
        this.setState({
          thumbnail: '../../../static/placeholderIMG.png',
          once: true,
        });
      }
    }

    return (
      <Query query={ALL_CATEGORIES_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p> Loading </p>;
          return (
            <Form id="form">
              <div className="info-container">
                {!createCourse ? <h2>Edit Course</h2> : <h2>Create Course</h2>}
                <label htmlFor="Title">
                  Title
                  <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="title"
                    defaultValue={!createCourse ? course.title : ''}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description" id="description">
                  Description
                  <div className="description" id="description">
                    <Editor
                      id="description"
                      data={!createCourse ? course.description : ''}
                      changeQuill={this.changeQuill}
                    />
                  </div>
                </label>
              </div>
              {/* divisao  */}
              <div className="actions-container">
                <SaveCourseButton
                  createCourse={createCourse}
                  data={this.state}
                  id={id}
                  changeToEdit={changeToEdit}
                />
                <label htmlFor="state">
                  Course State
                  <div id="courseState">
                    <Published
                      published={published}
                      changePublished={this.changePublished}
                    />
                    <Unpublished
                      unpublished={unpublished}
                      changeUnpublished={this.changeUnpublished}
                    />
                  </div>
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    min="0"
                    step="any"
                    name="price"
                    defaultValue={!createCourse ? course.price : ''}
                    placeholder="00.00"
                    value={this.price}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label htmlFor="category">
                  Category
                  <select
                    id="dropdownlist"
                    onChange={this.handleChangeCategory}
                    name="category"
                    defaultValue={!createCourse ? course.category.id : 'a'}
                  >
                    <option value="a" disabled hidden>
                      Select an Category
                    </option>
                    {data.categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="thumbnail">
                  Thumbnail Preview
                  {/* Thumbnail para o Edit */}
                  {!createCourse &&
                    (changeThumbnail ? (
                      course.thumbnail && (
                        <img alt="Placeholder" src={thumbnail} />
                      )
                    ) : (
                      <img alt="Placeholder" src={course.thumbnail} />
                    ))}
                  {/* Thumbnail para o create */}
                  {createCourse && <img alt="Placeholder" src={thumbnail} />}
                  <input
                    type="file"
                    name="thumbnail"
                    placeholder="thumbnail"
                    value={!createCourse ? thumbnail : ''}
                    onChange={this.uploadThumbnail}
                  />
                </label>
              </div>
            </Form>
          );
        }}
      </Query>
    );
  }
}

export default FormCourse;
