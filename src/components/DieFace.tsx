const one = [0, 0, 0, 0, 1, 0, 0, 0, 0];
const two = [1, 0, 0, 0, 0, 0, 0, 0, 1];
const three = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const four = [1, 0, 1, 0, 0, 0, 1, 0, 1];
const five = [1, 0, 1, 0, 1, 0, 1, 0, 1];
const six = [1, 1, 1, 0, 0, 0, 1, 1, 1];


export default function DieFace(props: { value: number, isHeld: boolean, mainClass: string }) {

    let dieArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    switch (props.value) {
        case 1: dieArray = one; break;
        case 2: dieArray = two; break;
        case 3: dieArray = three; break;
        case 4: dieArray = four; break;
        case 5: dieArray = five; break;
        case 6: dieArray = six; break;
    }
    const dotsElements = dieArray.map((isDot, idx) => <div key={idx} className={isDot ? "dot" : "empty"}></div>);

    return <div className={props.mainClass + " " + (props.isHeld ? 'held die' : "die")}>
        {dotsElements}
    </div>;

}