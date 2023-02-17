import React, { useEffect, useReducer, useRef } from "react"

export enum TimerAction {
    start = "start",
    stop = "stop",
    reset = "reset",
    tick = "tick",
    restart = "restart"
}

interface TimerState { isRunning: boolean; time: number; }
const initialState: TimerState = { isRunning: false, time: 0 }

function reducer(state: any, action: any): TimerState {
    switch (action.type) {
        case TimerAction.start: return { ...state, isRunning: true };
        case TimerAction.stop: return { ...state, isRunning: false };
        case TimerAction.reset: return { ...state, time: 0 };
        case TimerAction.tick: return { ...state, time: state.time + 1 };
        case TimerAction.restart: return { time: 0, isRunning: true };
        default: throw new Error();
    }
}

export default function Timer(props: { action: TimerAction, updateAppStateGameTime: (time: number) => void }) {

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const intervaIdRef = useRef(0);

    useEffect(() => {
        if (state.isRunning) {
            if (!intervaIdRef.current) {
                intervaIdRef.current = setInterval(() => {
                    dispatch({ type: TimerAction.tick })
                }, 1000);
            }
        } else {
            if (intervaIdRef.current) {
                clearInterval(intervaIdRef.current);
                intervaIdRef.current = 0;
            }
        }
        props.updateAppStateGameTime(state.time);
    }, [state])

    useEffect(() => {
        return () => { clearInterval(intervaIdRef.current); intervaIdRef.current = 0; };
    }, []);

    useEffect(() => {
        dispatch({ type: props.action });
    }, [props]);


    return <div>Seconds: {state.time}</div>
}