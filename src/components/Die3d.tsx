import { useEffect, useState } from "react";
import { DieData } from "../App";
import DieFace from "./DieFace";

export interface DieProps {
    data: DieData;
    onClick: () => void;
}

export default function Die3d(props: DieProps) {
    const [spinState, setSpinState] = useState('spin-to-1');
    useEffect(() => {
        setSpinState("spin-to-" + props.data.value);
    }, [props]);

    return <div className="scene" onClick={() => {
        props.onClick();
    }}>
        <div className={"cube spin-to " + spinState}>
            <DieFace mainClass="top" value={1} isHeld={props.data.isHeld && props.data.value == 1} />
            <DieFace mainClass="bottom" value={6} isHeld={props.data.isHeld && props.data.value == 6} />
            <DieFace mainClass="left" value={2} isHeld={props.data.isHeld && props.data.value == 2} />
            <DieFace mainClass="front" value={3} isHeld={props.data.isHeld && props.data.value == 3} />
            <DieFace mainClass="right" value={4} isHeld={props.data.isHeld && props.data.value == 4} />
            <DieFace mainClass="back" value={5} isHeld={props.data.isHeld && props.data.value == 5} />
        </div>
    </div >
}