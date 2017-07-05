import R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';

import SortOrder from '../utils/sort-order';

const SortHeader = ({ name, sortOrder, className, onClick }) => {
  return (
    <div className={"sort-header " + className} onClick={onClick}>
      {name}{
        sortOrder === SortOrder.ASC ? "↑" :
        sortOrder === SortOrder.DESC ? "↓" :
        ""
      }
    </div>
  )
}

SortHeader.propTypes = {
  name: PropTypes.string,
  sortOrder: PropTypes.oneOf(R.values(SortOrder)),
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default SortHeader;
