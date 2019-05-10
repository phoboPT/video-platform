import React, { Component } from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import VideoSection from './VideoSection/VideoSection';
import { SINGLE_VIDEO_QUERY } from '../../VideoManager/ShowVideo';
import sumAll from '../../../lib/sumAll';
import Loading from '../../Static/Loading';

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  #title {
    font-size: 24px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(58, 58, 58, 0.6);
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
  #author-title {
    padding-top: 10px;
    flex: 1;
    order: 1;
  }
  #author {
    order: 2;
    flex: 3;
  }
  #author-container {
    border-bottom: 1px solid rgba(58, 58, 58, 0.6);

    display: flex;
    padding-bottom: 10px;
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
          if (data.course) console.log(data);
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
                  <div id="author-title">
                    <p>Instructor</p>
                  </div>
                  <div id="author">
                    <p> {propsData.user.name} </p>
                  </div>
                </div>
                <div id="course-content">
                  <p id="title-content"> Course Content </p>
                  <div id="top-bar">
                    <p id="aulas"> {data.course.videos.length} aulas </p>
                    <p id="horas"> Total Hours {sumAll(data.course.videos)} </p>
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

export default Overview;
