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