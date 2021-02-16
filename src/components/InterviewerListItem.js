import React from "react";

import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props){
  let ListItemClass = classNames('interviewers__item', {'interviewers__item--selected': props.selected});
  let ListImgClass = classNames('interviewers__item-image', {'interviewers__item-image--selected': props.selected});
  return (
    <li className={ListItemClass} onClick={props.setInterviewer}>
      <img
        className={ListImgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}