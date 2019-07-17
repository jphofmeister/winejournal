import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WineCardGroup from './WineCardGroup';
import groupByMonth from '../../utils/groupByMonth';

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
    <div className="wine-feed">
      {months.map((month) => (
        <section key={month}>
          <h2>{getMonthYearString(month)}</h2>
          <WineCardGroup wines={winesByMonth[month]} />
        </section>
      ))}
    </div>
  );
};

export default WineFeed;