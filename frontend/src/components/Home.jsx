import React, { useEffect, useState } from 'react';
import WorkoutForm from './WorkoutForm';
import Workout from './Workout';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [error, setError] = useState(null);

  const loadWorkouts = async () => {
  

    try {
      const response = await fetch('/api/workouts/', {
        headers: {
          
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }

      const data = await response.json();
      dispatch({
        type: 'SET_WORKOUTS',
        payload: data,
      });
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  useEffect(() => {
    if(user){
      loadWorkouts();
    }
  }, [user, dispatch]);

  return (
    <div className="container">
      <div className="grid_container">
        <div className="workout_container">
          {error && <p className="error">{error}</p>}
          {workouts && workouts.length > 0 ? (
            workouts.map((item) => (
              <Workout key={item._id} workouts={item} />
            ))
          ) : (
            <p>No workouts found. Add a new workout to get started!</p>
          )}
        </div>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;

