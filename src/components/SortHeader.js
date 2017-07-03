import React from 'react';
import PropTypes from 'prop-types';

import SortTypes from '../utils/sort-types';

const SortHeader = ({ name, order, className, onClick }) => {
  return (
    <div className={"sort-header " + className} onClick={onClick}>
      {name}{
        order === SortTypes.ASC ? "↑" :
        order === SortTypes.DESC ? "↓" :
        ""
      }
    </div>
  )
}

SortHeader.propTypes = {
  name: PropTypes.string,
  order: PropTypes.oneOf(Object.values(SortTypes)),
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default SortHeader;
