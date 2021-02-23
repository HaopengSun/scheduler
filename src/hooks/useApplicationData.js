import { useState, useEffect, useReducer } from "react";

import axios from 'axios';

import { getAppointmentsForDay } from "../../src/helpers/selectors"

// export default function useApplicationData(){
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: [],
//     interviewers: {}
//   });

//   const setDay = day => setState(prev => ({ ...prev, day }));

//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"), 
//       axios.get("api/interviewers")
//     ]).then(all => {
//       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
//     })
//   }, [])

//   const spotsRemaining = function(){
//     const remain = getAppointmentsForDay(state, state.day).filter(appointment => appointment.interview === null).length;
//     const current = state.days.filter(day => day.name === state.day)[0];
//     if (current) {
//       current["spots"] = remain;
//       console.log(remain, current);
//     }
//   }
//   spotsRemaining();

//   function bookInterview(id, interview) {

//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     return axios.put(`/api/appointments/${id}`, {interview})
//     .then((res) => {
//       setState({...state, appointments});
//     })
//   }

//   function cancelInterview(id){
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     return axios.delete(`/api/appointments/${id}`)
//     .then((res) => {
//       setState({...state, appointments});
//     })
//   }

//   return {state, setDay, bookInterview, cancelInterview}
// }

export default function useApplicationData(){
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_REMAINING_SPOTS = "SET_REMAINING_SPOTS";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => dispatch({type: SET_DAY, day});

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        dispatch({type: SET_INTERVIEW, id, interview});
        dispatch({type: SET_REMAINING_SPOTS});
    })
  }
  
  function cancelInterview(id){
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => { 
        dispatch({type: SET_INTERVIEW, id, interview: null});
        dispatch({type: SET_REMAINING_SPOTS});
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"), 
      axios.get("/api/interviewers"),
    ]).then(all => {
      dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
    })

    // const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    // socket.onopen = function(event) {
    //   socket.send("Sending data to the server!");
    // }
    // socket.onmessage = function(event) {
    //   console.log("Message received!")
    //   console.log(event.data);
    //   const received = JSON.parse(event.data);
    //   if (received.type === SET_INTERVIEW){
    //     dispatch(received);
    //   }
    // }
  }, [])

  function reducer(state, action) {
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

  return { state, setDay, bookInterview, cancelInterview }
}