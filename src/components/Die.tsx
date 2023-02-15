import { DieData } from "../App";

export interface DieProps {
    data: DieData;
    onClick: () => void;
}

const one = [0, 0, 0, 0, 1, 0, 0, 0, 0];
const two = [1, 0, 0, 0, 0, 0, 0, 0, 1];
const three = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const four = [1, 0, 1, 0, 0, 0, 1, 0, 1];
const five = [1, 0, 1, 0, 1, 0, 1, 0, 1];
const six = [1, 1, 1, 0, 0, 0, 1, 1, 1];


export default function Die(props: DieProps) {
    const dieData = props.data;

    let dieArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    switch (dieData.value) {
        case 1: dieArray = one; break;
        case 2: dieArray = two; break;
        case 3: dieArray = three; break;
        case 4: dieArray = four; break;
        case 5: dieArray = five; break;
        case 6: dieArray = six; break;
    }
    const dotsElements = dieArray.map((isDot, idx) => <div key={idx} className={isDot ? "dot" : "empty"}></div>);

    return <div onClick={() => props.onClick()} className={dieData.isHeld ? 'held zar': "zar"}>
        {dotsElements}
    </div>;

    // return <div onClick={() => props.onClick()}
    //     className={dieData.isHeld ? "die held" : "die"} >
    //     {dieData.value}
    // </div>;
}