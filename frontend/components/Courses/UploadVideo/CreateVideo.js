import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Form from '../../styles/Form';
import Error from '../../Static/ErrorMessage.js';
import { ALL_VIDEOS_USER } from '../MyVideos/Videos';
import { ALL_COURSES_QUERY } from '../../Home/CoursesList/ListAllCourses';
import validateExtension from '../../../lib/validateFileExtensions';

const CREATE_VIDEO_MUTATION = gql`
  mutation CREATE_VIDEO_MUTATION(
    $title: String!
    $description: String!
    $urlVideo: String
    $course: ID!
    $file: String
  ) {
    createVideo(
      title: $title
      description: $description
      urlVideo: $urlVideo
      course: $course
      file: $file
    ) {
      id
    }
  }
`;

const Container = styled.div`
  max-width: 40%;
  text-align: center;
  label {
    text-align: left;
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
  }

  .false {
    width: auto;
    background: #d6887c;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-top: 1rem;
  }
  img {
    height: 50px;
  }
`;
const COURSE_QUERY = gql`
  query COURSE_QUERY {
    courses {
      id
      title
    }
  }
`;

class CreateVideo extends Component {
  state = {
    title: '',
    description: '',
    urlVideo: '',
    category: '',
    course: '',
    file: '',
    hasVideo: false,
    isUploading: 0,
    isUploadingFile: 0,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadVideo = async (e, createVideoMutation) => {
    this.setState({
      isUploading: 1,
    });

    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'video-platform');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/deky2cxlm/video/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    if (file) {
      this.setState({
        hasVideo: true,
      });
    }
    this.setState({
      urlVideo: file.secure_url,
      isUploading: 2,
    });

    createVideoMutation();
  };

  uploadFile = async e => {
    this.setState({
      isUploadingFile: 1,
    });

    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'fileUpload');
    const fileName = files[0].name;
    const isValid = validateExtension(fileName);

    if (isValid) {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/deky2cxlm/raw/upload',
        { method: 'POST', body: data }
      );

      const file = await res.json();
      if (file) {
        this.setState({
          hasFile: false,
        });
      }
      this.setState({
        file: file.secure_url,
        isUploadingFile: 2,
      });

      createVideoMutation();
    } else {
      alert('File Format not supported');
    }
  };

  saveCategory = e => {
    this.setState({ category: e.target.value });
  };

  saveCourse = e => {
    this.setState({ course: e.target.value });
  };

  changeUpload = e => {
    this.setState({ isUploading: 0 });
  };

  render() {
    const { title, show } = this.props;
    const { isUploading } = this.state;
    return (
      <Query query={COURSE_QUERY}>
        {({ data, error, loading }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error:{error.message}</p>;
          }
          return (
            <Container>
              <Mutation
                mutation={CREATE_VIDEO_MUTATION}
                variables={this.state}
                refetchQueries={[
                  { query: ALL_VIDEOS_USER },
                  { query: ALL_COURSES_QUERY },
                ]}
              >
                {(createVideo, { loading, error }) => (
                  <Form
                    onSubmit={async e => {
                      e.preventDefault();
                      // const res = await createVideo();
                      Router.push({
                        pathname: '/video',
                        query: { id: res.data.createVideo.id },
                      });
                    }}
                  >
                    <Error error={error} />
                    {title}

                    {show === 1 && (
                      <label htmlFor="file">
                        {isUploading === 0 && (
                          <input
                            className="file"
                            type="file"
                            name="file"
                            id="file"
                            placeholder="Upload a Video"
                            // required
                            onChange={e => this.uploadVideo(e, createVideo)}
                          />
                        )}
                      </label>
                    )}

                    {show === 2 && (
                      <label htmlFor="file">
                        <input
                          type="file"
                          name="file"
                          id="file"
                          placeholder="file"
                          onChange={e => this.uploadFile(e, createVideo)}
                        />
                      </label>
                    )}

                    {isUploading === 1 && (
                      <img src="../../static/loading.gif" alt="Loading" />
                    )}
                    {isUploading === 2 && (
                      <>
                        <img src="../../static/done.png" alt="done" />
                        <button type="button" onClick={this.changeUpload}>
                          Change Video
                        </button>
                      </>
                    )}
                    {/* <button
                        type="submit"
                        disabled={!hasVideo}
                        className={hasVideo.toString()}
                      >
                        Sav{loading ? 'ing' : 'e'}
                      </button> */}
                  </Form>
                )}
              </Mutation>
            </Container>
          );
        }}
      </Query>
    );
  }
}

CreateVideo.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.number.isRequired,
};

export default CreateVideo;
export { CREATE_VIDEO_MUTATION };
