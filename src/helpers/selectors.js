export function getAppointmentsForDay(state, day) {
  let appointments = [];
  let result = [];
  for (const individuel of state.days) {
    if (individuel.name === day){
      appointments = [...individuel.appointments];
    }
  }
  for (const appointment of appointments){
    result.push(state["appointments"][appointment]);
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview) {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    return {student, interviewer};
  }
  return null;
}