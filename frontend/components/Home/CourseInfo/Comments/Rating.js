import React, { Component } from 'react';
import RatingComponent from 'react-rating';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  .left {
    order: 1;
    margin: auto;
    font-size: 1.3rem;
    color: red;
  }
  .rigth {
    order: 2;
    flex: 1;
    padding-left: 0.8rem;
    color: grey;
    display: flex;
    #media {
      margin-left: 2px;
      order: 1;
      p {
      }
    }
    #totalComments {
      margin-left: 7px;
      order: 2;
      text-align: left;
      p {
        opacity: 0.6;
      }
    }
    .ratingDisplay {
      font-size: 5px;
    }
  }
`;

class Rating extends Component {
  state = {
    value: 0,
  };

  change = e => {
    this.setState({ value: e });
    this.props.getRating(e);
  };

  componentDidMount = () => {
    this.setState({ value: this.props.initialValue });
  };

  render() {
    const { readOnly, showTotal, totalComments } = this.props;
    const { value } = this.state;
    return (
      <Container>
        <div className="left">
          <RatingComponent
            className="ratingDisplay"
            emptySymbol="far fa-star fa-2x"
            fractions={2}
            fullSymbol="fa fa-star fa-2x"
            initialRating={parseInt(value)}
            onClick={this.change}
            placeholderSymbol="fa fa-star fa-2x"
            readonly={readOnly}
          />
        </div>
        <div className="rigth">
          <div id="media">
            <p>{Math.round(value * 10) / 10}</p>
          </div>

          <div id="totalComments">
            <p>{showTotal && `(${totalComments})`}</p>
          </div>
        </div>
      </Container>
    );
  }
}

export default Rating;
