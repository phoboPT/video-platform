import React, { Component } from 'react';
import RatingComponent from 'react-rating';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  grid: flex;
  display: inline;

  .left {
    display: inline-block;
    margin: auto;
    font-size: 1.3rem;
    color: red;
  }
  .rigth {
    display: inline-block;
    padding-left: 0.8rem;
    color: grey;
    strong {
      padding-right: 0.5rem;
      opacity: 0.8;
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
    const { value, readOnly } = this.state;
    const { showTotal, totalComments } = this.props;
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
          <strong>{Math.round(value * 10) / 10}</strong>{' '}
          {showTotal && totalComments}
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
};

export default Rating;
