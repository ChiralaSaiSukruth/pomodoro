import React, { useEffect, useState } from 'react';
import alaram from '../alarm.mp3'
const Pomodoro2 = () => {

    const [time,setTime] = useState(10)
    const [isActive,setIsActive] = useState(false)
    const[userInput,setUserInput] = useState('')
    const sound = new Audio(alaram)

    const updateTime = ()=>{
        if(time>0 && isActive){
            setTime((prev)=>prev-1)
        }
    }

    const extractMinutes = ()=>{
        const currentTime = time
        const CurrentMinutes = Math.floor(currentTime/60)
        return CurrentMinutes
    }

    const extractSeconds = ()=>{
        const currentTime = time
        const CurrentSeconds = currentTime%60
        return CurrentSeconds
    }

    const onchangeHandler = (e)=>{
        setIsActive(false)
        setUserInput(e.target.value)
     
    }
    

    const customTimeHandler = ()=>{
        const value = parseInt(userInput)
        setTime(value)
    }
    useEffect(()=>{
       const intervalId =  setInterval(updateTime,1000)
        if(time===0){
            sound.play()
            setIsActive(false)
            setTime(10)
        }
       return ()=>{
        clearInterval(intervalId)
       }

    },[time,isActive])
  return (
    <div className='alarm'>
                <h1>{`${extractMinutes()}:${extractSeconds()}`} </h1>
                    <input onChange={onchangeHandler} name='userInput'  type='number' value={userInput}/>
        <button className='Start' onClick={()=>setIsActive(true)}>Start</button>
        <button className='Pause'onClick={()=>setIsActive(false)}>Pause</button>
        <button className='setCustomTime'onClick={customTimeHandler}>setCustomTime</button>
    </div>
  );
}
export default Pomodoro2;