import { getAppointmentsForDay } from "../helpers/selectors"

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_REMAINING_SPOTS = "SET_REMAINING_SPOTS";

export {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_REMAINING_SPOTS}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.day};
    case SET_APPLICATION_DATA:
      return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
    case SET_INTERVIEW: {
      const appointment = { ...state.appointments[action.id], interview: action.interview }
      const appointments = { ...state.appointments, [action.id]: appointment };
      return {...state, appointments};
    }
    case SET_REMAINING_SPOTS: {
      const remain = getAppointmentsForDay(state, state.day).filter(appointment => appointment.interview === null).length;
      // update days array
      const update = state.days.map(day => {
        if(day.name !== state.day){
          return day
        }
        return { ...day, spots: remain }
      })
      return {...state, days: update};
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
