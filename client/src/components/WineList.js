import React from 'react';

const WineList = (props) => {
  return (
    <ul className="wine-list">
      {
        props.wineList.map((item, index) =>
          <li key={index} className="wine-card">
            <span className="wine-row">Name: {item.wineName} </span>
            <span className="wine-row">Winery: {item.winery} </span>
            <span className="wine-row">Wine Type: {item.wineType} </span>
            <span className="wine-row">Notes: {item.notes} </span>
            <span className="wine-row">Varietal: {item.varietal} </span>
            <span className="wine-row">Tasted On: {item.tasteDate}</span>
          </li>)
      }
    </ul>
  );
}

export default WineList;