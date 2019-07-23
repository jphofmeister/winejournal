import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WineCardGroup from './WineCardGroup';
import getMonthYearString from '../../utils/getMonthYearString';

const WineFeed = ({ months, winesByMonth }) => {
  return (
    <main className="wine-feed">
      {months.map((month) => (
        <section key={month} id={month}>
          <h2>{getMonthYearString(month)}</h2>
          <WineCardGroup wines={winesByMonth[month]} />
        </section>
      ))}
    </main>
  );
};

export default WineFeed;