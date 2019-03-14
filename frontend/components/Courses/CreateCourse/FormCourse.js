import React, { Component } from "react";
import styled from "styled-components";
import Form from "../../styles/Form";
import gql from "graphql-tag";
import Error from "../../Static/ErrorMessage";
import { Mutation, Query } from "react-apollo";
import { CURRENT_COURSES_QUERY } from "../MyCourses/MyCourses";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $thumbnail: String!
    $description: String!
    $price: Float!
    $category: ID!
  ) {
    createCourse(
      title: $title
      thumbnail: $thumbnail
      description: $description
      price: $price
      category: $category
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

const Container = styled.div`
  max-width: 70%;
  margin: auto;
  label {
    text-align: left;
  }
  button,
  input[type="submit"] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
  }
  span {
  }

  .description {
    background-color: lightgray;
  }
`;

class FormCourse extends Component {
  state = {
    title: "",
    description: "",
    state_: "",
    target: "",
    thumbnail: "",
    price: 0,
    category: "",
    editorState: EditorState.createEmpty(),
  };

  saveState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  uploadThumbnail = async e => {
    const files = e.target.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "thumbnail");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deky2cxlm/image/upload",
      { method: "POST", body: data },
    );

    const file = await res.json();
    this.setState({ thumbnail: file.secure_url });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    this.setState({
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Container>
        <Query query={ALL_CATEGORIES_QUERY}>
          {({ data, loading }) => {
            if (loading) return <p>Loading</p>;

            return (
              <Mutation
                mutation={CREATE_COURSE_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_COURSES_QUERY }]}
              >
                {(createCourse, { loading, error }) => (
                  <>
                    <Form
                      id="3"
                      method="post"
                      onSubmit={async e => {
                        e.preventDefault();
                        const res = await createCourse();
                        this.props.saveToState();
                      }}
                    >
                      <Error error={error} />
                      <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Information</h2>
                        <label htmlFor="Title">
                          Title
                          <input
                            type="text"
                            name="title"
                            placeholder="Awsome "
                            value={this.title}
                            onChange={this.saveState}
                            required
                          />
                        </label>

                        <label htmlFor="description">
                          Description
                          {/* <input
                            type="text"
                            name="description"
                            placeholder="This is the best Course you will find"
                            value={this.description}
                            onChange={this.saveState}
                            required
                          /> */}
                          <div className="description">
                            <Editor
                              editorState={editorState}
                              wrapperClassName="demo-wrapper"
                              editorClassName="demo-editor"
                              onEditorStateChange={this.onEditorStateChange}
                              toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                              }}
                            />
                          </div>
                        </label>
                        <label htmlFor="state">
                          State
                          <input
                            type="text"
                            name="state"
                            placeholder="state"
                            value={this.state_}
                            onChange={this.saveState}
                            required
                          />
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
                        {this.state.thumbnail && (
                          <img
                            src={this.state.thumbnail}
                            alt="Upload Preview"
                            width="200"
                          />
                        )}
                        <label htmlFor="price">
                          Price
                          <input
                            type="number"
                            min="1"
                            step="any"
                            name="price"
                            placeholder="00,00"
                            value={this.price}
                            onChange={this.saveState}
                            required
                          />
                        </label>
                        <label htmlFor="category">Category</label>
                        {this.state.category === "" ? (
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
                        <br />
                        <br />
                        <button>Next</button>
                      </fieldset>
                    </Form>
                  </>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default FormCourse;
