import React, { Component } from 'react';
import RatingComponent from 'react-rating';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;

  .left {
    order: 1;
    margin: auto;
    font-size: 1.3rem;
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
    const { getRating } = this.props;
    this.setState({ value: e });
    getRating(e);
  };

  componentDidMount = () => {
    const { initialValue } = this.props;
    this.setState({ value: initialValue });
  };

  render() {
    const { readOnly, showTotal, totalComments } = this.props;
    const { value } = this.state;
    return (
      <Container>
        <RatingComponent
          className="ratingDisplay"
          emptySymbol="far fa-star fa-2x"
          fractions={2}
          fullSymbol="fa fa-star fa-2x"
          initialRating={value || 0}
          onClick={this.change}
          placeholderSymbol="fa fa-star fa-2x"
          readonly={readOnly}
        />
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

Rating.propTypes = {
  initialValue: PropTypes.number,
  showTotal: PropTypes.bool,
  totalComments: PropTypes.number,
  getRating: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default Rating;
