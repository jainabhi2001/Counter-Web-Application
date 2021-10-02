import { useState,useEffect } from 'react';
import './App.css';

function App() {
  //'setCountervalue' is the function to change the value/state of "countervalue"
  const [ countervalue,setCountervalue]= useState(10)
  const [changeValue, setChangeValue] = useState(1);

  /*
  useEffect(() => {   
    {/*'useEffect' is another Hook example which is called everytime on rendering.
      It has 2 parts - 1. Event that we want to run, 2. depedency list for event*/
      //fetch("./data.json") // This is a JS function, which we can fetch any file,end point or Url.
      // Note: while fetching operation is going on we can't wait for the process to complete as we have to proceed further so we make it asynchronous
      /*fetch("./data.json").then((response) => response.json).then((data)=>{
      setCountervalue(data.counter);
      setChangeValue(data.changeValue);
      }).catch((err) => console.log(err)); //If there is any error then this function deals with it,    
   }, [])
   */

   //Async version of 'usEffect'
   useEffect(async () => {   
      /*'useEffect' is another Hook example which is called everytime on rendering.
      It has 2 parts - 1. Event that we want to run, 2. depedency list for event*/
      //fetch("./data.json") // This is a JS function, which we can fetch any file,end point or Url.
      // Note: while fetching operation is going on we can't wait for the process to complete as we have to proceed further so we make it asynchronous
      fetch("./data.json").then((response) => response.json).then((data)=>{
      setCountervalue(data.counter);
      setChangeValue(data.changeValue);
      }).catch((err) => console.log(err)); //If there is any error then this function deals with it, 

      try {
        const response = await fetch("./data.json"); 
        // The keyword await is used to wait for the activity which here is a promise of fetching data
        const data = await response.json();
  
        setCountervalue(data.counter);
        setChangeValue(data.changeValue);
      } 
      catch (error) {
        console.log(error);
      }
   }, [])


  const updateChangeValue = (e) => {
    console.log("changed")
    setChangeValue(parseInt(e.target.value)); {/* This is attributes associated with event name 'e'*/}
  };

  return (
    <div className="App">
      <p  className= "title"> Counter</p>
      <input className= "inpField" value={changeValue} type="number" onChange={updateChangeValue} />  {/*when a change occurs*/}
      <div className="counter">
      {/*<button onClick={() => setCountervalue(countervalue+1)}> + </button>*/}
      {/* Memory leak: When we directly change the value, there might be race condition happening, because it is reading the value itself and updating itself. So there might be different calls*/}
      <button onClick={() => setCountervalue((prevValue) => prevValue + changeValue)}> {/*To prevent memory leak we used another variable.It reads from current state and is accessed as passed value from 'useState' object*/}
        +
      </button>
      
      <p> {countervalue} </p>
      <button onClick={() => setCountervalue((prevValue) => prevValue - changeValue)}> - </button>
      </div> 
    </div>
  );
}

export default App;
