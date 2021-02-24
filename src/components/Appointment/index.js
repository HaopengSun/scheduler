import React, {useEffect} from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import Delete from "components/Appointment/Delete";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    console.log(props.interview, mode);
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch(error => transition(ERROR_SAVE, true));;
  }

  function del(){
    transition(DELETING, true);
    props.cancelInterview(props.id).then(() => transition(EMPTY)).catch(error => transition(ERROR_DELETE, true));;
  }

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)} />)}
      {mode === CREATE && <Form interviewers={props.interviewers}
        onCancel={() => back(EMPTY)} onSave={save}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && <Delete onCancel={() => transition(SHOW)} onConfirm={del}
      message="Are you sure you would like to delete?"/>}
      {mode === EDIT && <Form interviewers={props.interviewers}
        student={props.interview.student}
        id={props.interview.interviewer.id}
        onCancel={() => back(EMPTY)} onSave={save}/>}
      {mode === ERROR_SAVE && <Error onClose={() => transition(EMPTY)} message="Could not save the appointment"/>}
      {mode === ERROR_DELETE && <Error onClose={() => transition(SHOW)} message="Could not cancel the appointment"/>}
    </article>
  )
}