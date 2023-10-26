import React, { useState, useRef, useEffect } from 'react'
import "../css/global.css"
import "../css/timer.css"

function PomodoroTimer () {
    // 45 Minute Timer, 15 Minute Break
    // 45 Minutes = 2700000 Milliseconds
    
    const Ref = useRef(null);
 
    // The state for our timer
    const [timer, setTimer] = useState('45:00');
 
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
 
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
 
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '') + '' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
 
    const clearTimer = (e) => {
 
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('45:00');
 
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
 
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if 
        // you intend to add more time
        deadline.setMinutes(deadline.getMinutes() + 45);
        return deadline;
    }
 
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
 
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
 
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
 
    return (
        <div className="panel timer">
            <h2>{timer}</h2>
            <button onClick={onClickReset} className="timerBtn btn btn-primary" type="button">Reset</button>
        </div>
        );
}

export default PomodoroTimer;