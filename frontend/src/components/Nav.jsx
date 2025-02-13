import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext'

 export const Nav = () => {
  const {user} = useAuthContext();
  const {dispatch} = useWorkoutsContext();

  const {logout} = useLogout()

  const handleClick= ()=>{
    logout()

    
  }
  
  return (
   <header className="nav">
    <nav>
    <div className="nav_content">
    <div className='nav_logo'>
      Workouts
    </div>
    {user && (
       <div>
       <span>{user.email}</span>
       <button onClick={handleClick} className='logout'>Log Out</button>
     </div>
    )}
   {
    !user && (
      <div className="links">
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
    )
   }
    </div>
    </nav>
   
   </header>
  )
}


