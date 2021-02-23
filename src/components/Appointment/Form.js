import React, { useState } from "react"
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

export default function From(props){
  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.id || null);
  const [error, setError] = useState("");
  function reset() {
    setName("");
    setInterviewer(null);
  }
  function cancel() {
    reset();
    props.onCancel();
  }
  function validation(){
    if(name === ''){
      setError('Student name cannot be blank');
      return
    }
    // if(interviewer === null){
    //   setError('Must choose an interviewer');
    //   return
    // }
    setError("");
    props.onSave(name, interviewer);
  }
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => {
          event.preventDefault();
          // validate the user input when the submit event happens
          validation();
          }}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList interviewers={props.interviewers}
          interviewer={interviewer} setInterviewer={(interviewer) => setInterviewer(interviewer)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validation}>Save</Button>
        </section>
      </section>
    </main>
  )
}