import { useState, useEffect } from "react";

import axios from 'axios';

import { getAppointmentsForDay } from "../../src/helpers/selectors"

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"), 
      axios.get("api/interviewers")
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  const spotsRemaining = function(){
    const remain = getAppointmentsForDay(state, state.day).filter(appointment => appointment.interview === null).length;
    const current = state.days.filter(day => day.name === state.day)[0];
    if (current) {
      current["spots"] = remain;
      console.log(remain, current);
    }
  }
  spotsRemaining();

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {
      setState({...state, appointments});
    })
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({...state, appointments});
    })
  }

  return {state, setDay, bookInterview, cancelInterview}
}
