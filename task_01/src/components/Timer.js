import { useEffect, useRef, useState } from "react";

export default function Timer() {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState("Stopped");

    function clickHandler(e)
    {
        e.target.value = "";
        e.target.readOnly = false;
        e.target.classList.remove("readonly");
    }

    function calculateTimeLeft()
    {
        let inputHours = parseInt(hours);
        let inputMinutes = parseInt(minutes);
        let inputSeconds = parseInt(seconds);
        
        return (inputHours * 3600) + (inputMinutes * 60) + inputSeconds;
    }

    function OutOfFocus(e)
    {
        e.target.value = updateInput(e.target.value);
    }

    function updateInputs(totalSeconds)
    {
        let updatedHours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let updatedMinutes = Math.floor(totalSeconds / 60);
        let updatedSeconds = totalSeconds % 60;

        setHours(updateInput(updatedHours));
        setMinutes(updateInput(updatedMinutes));
        setSeconds(updateInput(updatedSeconds));
    }

    function updateInput(value)
    {
        let result = value;

        if (value < 0 || value === "")
        {
            result = "00";
        }
        else if (value >= 0 && value < 10)
        {
            result = `0${value}`;
        }
        else if (value > 59)
        {
            result = "59";
        }

        return result;
    }

    function Start()
    {
        const startBtn = document.querySelector(".start");
        startBtn.classList.add("hidden");
        
        const stopBtn = document.querySelector(".stop");
        stopBtn.classList.remove("hidden");

        const pauseBtn = document.querySelector(".pause");
        pauseBtn.classList.remove("hidden");
        
        setTimeLeft(calculateTimeLeft());
        setStatus("Started");
    }

    function Stop()
    {
        const stopBtn = document.querySelector(".stop");
        stopBtn.classList.add("hidden");
        
        const pauseBtn = document.querySelector(".pause");
        pauseBtn.classList.add("hidden");
        
        const startBtn = document.querySelector(".start");
        startBtn.classList.remove("hidden");

        setTimeLeft(0);
        setStatus("Stopped");
    }

    function Pause()
    {
        const stopBtn = document.querySelector(".stop");
        stopBtn.classList.remove("hidden");
        
        const startBtn = document.querySelector(".start");
        startBtn.classList.remove("hidden");

        setStatus("Stopped");
    }

    function updateTimer()
    {
        let prevTimeLeft = timeLeft;

        if (prevTimeLeft <= 1)
        {
            setStatus("Stopped");

            const stopBtn = document.querySelector(".stop");
            stopBtn.classList.add("hidden");

            const pauseBtn = document.querySelector(".pause");
            pauseBtn.classList.add("hidden");
            
            const startBtn = document.querySelector(".start");
            startBtn.classList.remove("hidden");

            setTimeLeft(0);
        }

        let currTimeLeft = prevTimeLeft - 1;

        setTimeLeft(currTimeLeft);
    }

    useEffect(() => {
        if (status === "Started" && timeLeft > 0) {
            const timer = setInterval(updateTimer, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft, status]);

    useEffect(() => {
        updateInputs(timeLeft);
    }, [timeLeft]);

    function OnChange(e, setValue)
    {
        setValue(e.target.value);
    }

    return (
        <div>
            <div className="timer">
                <input value={hours} id="hours" type="number" className="hours" onClick={clickHandler} onBlur={OutOfFocus} onChange={(e) => {OnChange(e, setHours)}} readOnly />
                <h1 className="divider">:</h1>
                <input value={minutes} id="minutes" type="number" className="minutes" onClick={clickHandler} onBlur={OutOfFocus} onChange={(e) => {OnChange(e, setMinutes)}} readOnly />
                <h1 className="divider">:</h1>
                <input value={seconds} id="seconds" type="number" className="seconds" onClick={clickHandler} onBlur={OutOfFocus} onChange={(e) => {OnChange(e, setSeconds)}} readOnly />
            </div>

            <div className="buttons">
                <button className="start" onClick={Start}>Start</button>
                <button className="stop hidden" onClick={Stop}>Stop</button>
                <button className="pause hidden" onClick={Pause}>Pause</button>
            </div>
        </div>
    );
}