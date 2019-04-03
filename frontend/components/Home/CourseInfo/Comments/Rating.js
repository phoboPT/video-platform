import React, { Component } from "react";
import Rating from "react-rating";

class RatingPage extends Component {
  state = {
    value: 2
  };
  change = e => {
    this.setState({ value: e });
    this.props.getRating(e);
  };
  render() {
    return (
      <Rating
        emptySymbol="far fa-star fa-2x"
        fullSymbol="fa fa-star fa-2x"
        placeholderSymbol="fa fa-star fa-2x"
        placeholderRating={this.state.value}
        fractions={2}
        onClick={this.change}
      />
    );
  }
}

export default RatingPage;
