import { useAuthContext } from "../../hooks/useAuthContext";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function Workout({workouts}){
    const {dispatch}=useWorkoutsContext()
    const {user} = useAuthContext()
    const handleClick = async()=>{
        if(!user){
            return
        }
        const response = await fetch('/api/workouts/'+workouts._id,{
            method: 'DELETE',
            headers:{'Authorization': `Bearer ${user.token}`}
          

        })
        const json = await response.json();

        if(!response.ok){
            throw new Error('Something went wrong');
        }

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT', payload:json})
        }
    }
    return (
        <div className="workout_details">
         <h3>Title: {workouts.title}</h3>
            <p><strong>Load (kg): </strong>{workouts.load}</p>
            <p><strong>Reps:</strong> {workouts.reps}</p>
            <p>{formatDistanceToNow(new Date(workouts.createdAt), {addSuffix:true})}</p>
            <span onClick={handleClick} className="material-symbols-outlined">delete</span>
        </div>
    )
}

export default Workout