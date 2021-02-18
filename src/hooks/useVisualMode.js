import React, { useState, useEffect } from "react";

export default function useVisualMode(init){
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);
  const transition = function(trans, replace=false) {
    if(replace){
      history.pop();
    }
    setHistory([...history, trans]);
    setMode(trans);
  }
  const back = function(){
    if (history.length > 1){
      history.pop();
      const index = history.length - 1;
      setMode(history[index]);
    } else {
      setMode(history[0]);
    }
    
  }
  return { mode, transition, back };
}