import React, { Component } from "react";
import Rating from "react-rating";
import styled from "styled-components";

const Container = styled.div`
  grid: flex;
  display: inline;

  .left {
    display: inline-block;
    margin: auto;
    font-size: 1.5rem;
    color: #e8dd0d;
  }
  .rigth {
    display: inline-block;
    padding-left: 0.8rem;

    color: grey;
    strong {
      padding-right: 0.5rem;
      color: black;
      opacity: 0.8;
    }
    .ratingDisplay {
      font-size: 5px;
    }
  }
`;

class RatingPage extends Component {
  state = {
    value: 0
  };
  change = e => {
    this.setState({ value: e });
    this.props.getRating(e);
  };

  componentDidMount = () => {
    this.setState({ value: parseInt(this.props.initialValue) });
  };

  render() {
    return (
      <Container>
        <div className="left">
          <Rating
            className="ratingDisplay"
            emptySymbol="far fa-star fa-2x"
            fractions={2}
            fullSymbol="fa fa-star fa-2x"
            initialRating={this.state.value}
            onClick={this.change}
            placeholderSymbol="fa fa-star fa-2x"
            readonly={this.props.readOnly}
          />
        </div>
        <div className="rigth">
          <strong>{this.state.value}</strong>
          (2,000)
        </div>
      </Container>
    );
  }
}

export default RatingPage;
