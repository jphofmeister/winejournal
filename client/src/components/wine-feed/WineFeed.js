import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WineCard from './WineCard';

class WineFeed extends Component {
  render() {
    const { wines } = this.props;

    return wines.map(wine => <WineCard key={wine._id} wine={wine} />);
  }
}

WineFeed.propTypes = {
  wines: PropTypes.array.isRequired
}

export default WineFeed;