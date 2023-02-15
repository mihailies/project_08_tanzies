import React from "react"

export default function Seconds(){
    const [seconds, setSeconds] = React.useState(0);    


    return <div>Seconds: {seconds}</div>
}