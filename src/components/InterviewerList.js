import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props){
  const items = props.interviewers.map(item => {
    return(
      <InterviewerListItem 
        key={item.id}
        name={props.interviewer === item.id && item.name} 
        avatar={item.avatar} 
        selected={props.interviewer === item.id}
        setInterviewer={(event) => props.setInterviewer(item.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {items}
      </ul>
    </section>
  )
}