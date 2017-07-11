import React from 'react';

import './Legend.css';

const types = [
  {
    type: "available",
    label: "Available"
  },
  {
    type: "booking",
    label: "Busy"
  },
  {
    type: "closed",
    label: "Closed"
  }
]

const Item = ({ type, label }) => (
  <div className={`legend--item legend--${type}`}>
    <span className="box"></span>&nbsp;<span className="label">{label}</span>
  </div>
);

const Legend = () => (
  <div className="legend">
    {types.map(({type, label}) => (
      <Item key={type} type={type} label={label} />
    ))}
  </div>
);

export default Legend;
