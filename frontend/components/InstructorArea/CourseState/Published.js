import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  margin-right: 5px;
  &:disabled {
    background: #3a8925 !important;
    opacity: 0.5;
    color: white !important;
  }
`;
class Published extends Component {
  render() {
    const { changePublished, published } = this.props;
    return (
      <Button
        type="button"
        onClick={() => changePublished()}
        disabled={published}
      >
        <img alt="Published" src="../../../static/rightpublished.png" />
        Published
      </Button>
    );
  }
}

Published.propTypes = {
  changePublished: PropTypes.func.isRequired,
  published: PropTypes.bool.isRequired,
};

export default Published;
