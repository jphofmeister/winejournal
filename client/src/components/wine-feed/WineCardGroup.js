import React from 'react';
import WineCard from './WineCard';

const WineCardGroup = ({ wines = [] }) => (
  <section>
    {wines.map(wine => <WineCard key={wine._id} wine={wine} />)}
  </section>
);

export default WineCardGroup;