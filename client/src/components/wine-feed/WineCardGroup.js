import React from 'react';
import WineCard from './WineCard';

const WineCardGroup = ({ wines = [] }) => (
  <div className="wine-card-group">
    {wines.map(wine => <WineCard key={wine._id} wine={wine} />)}
  </div>
);

export default WineCardGroup;