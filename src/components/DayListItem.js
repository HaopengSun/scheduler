import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {
  const formatSpots = function(spots) {
    if(spots) {
      if(spots === 1) {
        return spots + ' spot remaining';
      } else {
        return spots + ' spots remaining';
      }
    } else {
      return 'no spots remaining';
    }
  }
  let remaining = formatSpots(props.spots);
  let ListItemClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': !props.spots});
  return (
    <li onClick={() => props.setDay(props.name)} data-testid="day"
    className={ListItemClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{remaining}</h3>
    </li>
  );
}