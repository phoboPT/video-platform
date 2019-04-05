import React, { Component } from "react";
import Rating from "react-rating";
import styled from "styled-components";

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
    this.setState({ value: this.props.initialValue });
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
          <strong>{Math.round(this.state.value * 10) / 10}</strong>{" "}
          {this.props.showTotal && this.props.totalComments}
        </div>
      </Container>
    );
  }
}

export default RatingPage;
