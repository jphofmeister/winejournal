import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WineCardGroup from './WineCardGroup';
import groupByMonth from '../../utils/groupByMonth';

// class WineFeed extends Component {
//   render() {
//     const { wines } = this.props;

//     return wines.map(wine => <WineCard key={wine._id} wine={wine} />);
//   }
// }

// WineFeed.propTypes = {
//   wines: PropTypes.array.isRequired
// }

const getMonthYearString = date =>
    new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long'
    });

const WineFeed = ({wines}) => {
  const {months, winesByMonth} = groupByMonth(wines);
  if (months === 0) {
    return (
      <span>You have not added any wine.</span>
    );
  }
  return (
    <div>
      {months.map((month) => (
        <div key={month}>
          {getMonthYearString(month)}
          <WineCardGroup wines={winesByMonth[month]} />
        </div>
      ))}
    </div>
  );
};


export default WineFeed;