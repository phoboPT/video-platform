import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Editor from '../Editor';
// import ReactQuill from "react-quill";
import Error from '../../Static/ErrorMessage';
import Form from '../../styles/Form';
import Published from '../CourseState/Published';
import Unpublished from '../CourseState/Unpublished';
import { CURRENT_COURSES_QUERY } from '../MyCourses';
import SaveCourseButton from './SaveCourseButton';

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $thumbnail: String!
    $description: String!
    $price: Float!
    $state: String!
    $category: ID!
  ) {
    createCourse(
      title: $title
      thumbnail: $thumbnail
      description: $description
      price: $price
      category: $category
      state: $state
    ) {
      id
    }
  }
`;

const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      name
      id
    }
  }
`;
const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;
const Container = styled.div`
  .info-container {
    grid-column: 1 / 2;

    label {
      display: block;
      margin-bottom: 1rem;
      text-align: left;
    }
  }
  form {
    display: grid;
    grid-template-columns: 2fr 1fr;
    fieldset {
      border: 0;
      padding: 0;

      & [disabled] {
        opacity: 0.5;
      }

      & [aria-busy='true']::before {
        background-size: 50 % auto;
        animation: ${loading} 0.5 s linear infinite;
      }
    }
  }
  .actions-container {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    text-align: center;
    display: grid;
    flex-direction: column;
    input {
      margin: 10px;
    }
    label {
      margin: 40px;
      img {
        margin-top: 10px;
        width: 100%;
        height: 80%;
      }
    }

    #submit {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin-top: 40px;
      margin: 0 auto;
      font-size: 25px;
      font-weight: 400;
      border: none;
      background: #27ad39;
      margin-top: 40px;
      cursor: pointer;
      color: white;
      :focus {
        outline: none;
      }
    }

    #submitLoading {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin-top: 40px;
      margin: 0 auto;
      font-size: 25px;
      font-weight: 400;
      border: 2px solid #727272;
      background: white;
      color: #727272;
      margin-top: 40px;
      cursor: pointer;
    }
  }

  #courseState {
    padding-top: 10px;
    padding-bottom: 10px;
    button {
      color: #3d3d3d;
      font-size: 17px;
      font-weight: 400;
      border: 1px solid #cccccc;
      background: #f7f7f7;
      cursor: pointer;
      position: relative;
    }
    button:hover {
      outline: none;
      background: #e5e5e5;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const Back = styled.div`
  float: left;
  text-align: center;
  a {
    font-size: 19px;
  }
  button {
    border: none;
    background: none;
    &:hover {
      outline: none;
    }
    cursor: pointer;
  }
`;

class FormCourse extends Component {
  state = {
    category: '',
    description: '',
    editorState: EditorState.createEmpty(),
    isDisabled: true,
    price: 0,
    published: false,
    state: 'UNPUBLISHED',
    target: '',
    thumbnail: '',
    title: '',
    unpublished: true,
  };

  saveState = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  changePublished = e => {
    const { unpublished, published } = this.state;
    this.setState({
      published: !published,
      state: 'PUBLISHED',
      unpublished: !unpublished,
    });
  };

  changeUnpublished = e => {
    const { unpublished, published } = this.state;
    this.setState({
      published: !published,
      state: 'UNPUBLISHED',
      unpublished: !unpublished,
    });
  };

  uploadThumbnail = async e => {
    this.setState({ isDisabled: true });
    const { files } = e.target;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'thumbnail');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/deky2cxlm/image/upload',
      { method: 'POST', body: data }
    );

    const file = await res.json();
    this.setState({ isDisabled: false, thumbnail: file.secure_url });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    this.setState({
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  changeQuill = value => {
    this.setState({ description: value, text: value });
  };

  handleChange = e => {
    this.setState({ category: e.target.value });
  };

  render() {
    const { changeView, saveToState } = this.props;
    const {
      thumbnail,
      published,
      unpublished,
      description,
      category,
      isDisabled,
    } = this.state;
    return (
      <>
        <Back>
          <button type="button" onClick={() => changeView(1)}>
            <a>⬅ Go Back</a>
          </button>
        </Back>
        <Container>
          <Query query={ALL_CATEGORIES_QUERY}>
            {({ data, loading }) => {
              if (loading) return <p>Loading</p>;

              return (
                <Mutation
                  mutation={CREATE_COURSE_MUTATION}
                  refetchQueries={[{ query: CURRENT_COURSES_QUERY }]}
                  variables={this.state}
                >
                  {(createCourse, { error, loading }) => (
                    <>
                      <form>
                        <div className="info-container">
                          <Error error={error} />
                          <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Information</h2>
                            <label htmlFor="Title">
                              Title
                              <input
                                type="text"
                                name="title"
                                placeholder="Awsome"
                                value={this.title}
                                onChange={this.saveState}
                                required
                              />
                            </label>

                            <label htmlFor="description">
                              Description
                              <div className="description">
                                <Editor
                                  data={description}
                                  changeQuill={this.changeQuill}
                                />
                              </div>
                            </label>
                          </fieldset>
                        </div>
                        {/* divisao */}
                        <div className="actions-container">
                          {/* <form
                            method="post"
                            onSubmit={async e => {
                              e.preventDefault();
                              const res = await createCourse();
                              saveToState(res);
                            }}
                          >
                            <button
                              id={loading ? 'submitLoading' : 'submit'}
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? 'Creating...' : 'Create Course'}
                            </button>
                          </form> */}

                          <SaveCourseButton data={this.state} />

                          <label htmlFor="state">
                            Course Status
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
                          <label htmlFor="thumbnail">
                            Thumbnail
                            <span> *20 mb max</span>
                            <input
                              type="file"
                              name="thumbnail"
                              placeholder="Upload an Image"
                              onChange={this.uploadThumbnail}
                              required
                            />
                          </label>
                          {thumbnail && (
                            <img
                              src={thumbnail}
                              alt="Upload Preview"
                              width="200"
                            />
                          )}
                          <label htmlFor="price">
                            Price
                            <input
                              type="number"
                              min="0"
                              step="any"
                              name="price"
                              placeholder="00.00"
                              value={this.price}
                              onChange={this.saveState}
                              required
                            />
                          </label>
                          <label htmlFor="category">Category</label>
                          {category === '' ? (
                            this.setState({ category: data.categories[0].id })
                          ) : (
                            <></>
                          )}
                          <select
                            id="dropdownlist"
                            onChange={this.handleChange}
                            name="category"
                          >
                            {data.categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </form>
                    </>
                  )}
                </Mutation>
              );
            }}
          </Query>
        </Container>
      </>
    );
  }
}

export default FormCourse;
