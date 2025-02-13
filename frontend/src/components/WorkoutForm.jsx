import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

function WorkoutForm() {
  const {dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();
 const [title, setTitle] = useState("");
 const [load, setLoad] = useState('');
 const [reps, setReps] = useState('');
 const [error, setError] = useState(null)

 const [emptyFields, setEmptyFields] = useState([])





const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!user){
      setError('You must be logged in')
      return
    }

    const workout = {title, load, reps};
    console.log(user.token);

    const response = await fetch('/api/workouts/',{
        method:'POST',
        headers:{
          'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          
        },
        body:JSON.stringify(workout),
    })
    const json = await response.json();
    console.log(response);

    if(!response.ok){
    console.log(response);

       setEmptyFields(json.emptyFields || [])
        setError(json.error ||'An error occurred while adding the workout')
    }

    if(response.ok){
        setTitle('');
        setLoad('');
        setReps('')
        setError(null);
        setEmptyFields([])
        console.log('New workout added', json)
        dispatch({type:'CREATE_WORKOUTS', payload:json})
    }
}

  

  return (
    <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
      <h3>Add a New Workout</h3>
      <div>
        <label>Exercise Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes('Title') ? 'error':''}
        />
      </div>
      <div>
        <label>Exercise Load:</label>
        <input
          type="number"
          value={load}
          onChange={(e)=>setLoad(e.target.value===''? '':parseInt(e.target.value))}
          className={emptyFields.includes('Load') ? 'error': ''}
     />
      </div>
      <div>
        <label>Exercise Reps:</label>{" "}
        <input
          type="number"
          value={reps}
          onChange={(e) =>setReps(e.target.value === ''?'': parseInt(e.target.value))}
          className={emptyFields.includes('Reps')?'error': ''}
          
       />
      </div>

      <button type="submit">submit</button>
    </form>
  );
}

export default WorkoutForm;
