import React, { Component } from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Link from 'next/link';
import PropTypes from 'prop-types';
import VideoSection from './VideoSection/VideoSection';
import { SINGLE_VIDEO_QUERY } from '../../VideoManager/ShowVideo';
import sumAll from '../../../lib/sumAll';
import Loading from '../../Static/Loading';

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  #title {
    font-size: 20px;
    padding-bottom: 15px;
  }

  #description-title {
    padding-top: 10px;
    flex: 1;
    order: 1;
  }
  #description {
    order: 2;
    flex: 3;
  }
  #description-container {
    display: flex;
    border-bottom: 1px solid rgba(58, 58, 58, 0.6);
    padding-bottom: 10px;
  }

  #author-container {
    display: flex;
    border-bottom: 1px solid rgba(58, 58, 58, 0.6);
    #left-author {
      flex: 1;
      order: 1;
      #author-name {
        display: flex;
        padding-bottom: 10px;
        #author-title {
          order: 1;
        }
        #author {
          padding-left: 2rem;
          order: 2;
          flex: 3;
        }
      }

      #see-more {
        cursor: pointer;
        padding: 1rem;
        border: none;
        font-size: 15px;
        margin: 2rem;
        border-radius: 12px;
        background: E7E7E7;
      }
      img {
        height: 100px;
      }
    }
    #right-author {
      line-height: 1.6;
      margin: 1rem;
      flex: 1;
      order: 2;
    }
  }
  #course-content {
    #title-content {
      font-size: 24px;
    }
    #top-bar {
      display: flex;

      #aulas {
        margin: auto;
        order: 2;
        flex: 1;
      }
      #horas {
        margin-left: 2rem;
        order: 1;
        flex: 1;
      }
    }
  }
`;

class Overview extends Component {
  state = {
    id: this.props.data.id,
  };

  render() {
    const { data: propsData } = this.props;
    const { id } = this.state;
    return (
      <Query
        query={SINGLE_VIDEO_QUERY}
        variables={{
          id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <Loading />;
          if (!data.course) return <p>No Data</p>;
          if (data.course)
            return (
              <>
                <Container>
                  <br />
                  <div id="title">
                    <p>About The Course</p>
                  </div>
                  <div id="description-container">
                    <div id="description-title">
                      <p>Description</p>
                    </div>
                    <div id="description">
                      <Markdown
                        escapeHtml={false}
                        source={propsData.description}
                      />
                    </div>
                  </div>
                  <div id="author-container">
                    <div id="left-author">
                      <div id="title">
                        <p>About The Instructor</p>
                      </div>
                      <div id="author-name">
                        <div id="author-title">
                          <img alt="thumbnail" src={propsData.user.thumbnail} />
                        </div>
                        <div id="author">
                          <p> {propsData.user.name} </p>
                          <p>{propsData.user.profession || ''}</p>
                        </div>
                      </div>
                      <Link
                        href={{
                          pathname: '/instructor',
                          query: {
                            id: propsData.user.id,
                          },
                        }}
                      >
                        <button id="see-more" type="button">
                          Know more about..
                        </button>
                      </Link>
                    </div>
                    <div id="right-author">
                      <Markdown
                        escapeHtml={false}
                        source={propsData.user.description}
                      />
                    </div>
                  </div>
                  <div id="course-content">
                    <p id="title-content"> Course Content </p>
                    <div id="top-bar">
                      <p id="aulas"> {data.course.videos.length} lessons </p>
                      <p id="horas">Total Hours {sumAll(data.course.videos)}</p>
                    </div>
                    <VideoSection key={id} data={data} />
                  </div>
                </Container>
              </>
            );
        }}
      </Query>
    );
  }
}

Overview.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Overview;
