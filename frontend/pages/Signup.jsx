import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup,isLoading,error} = useSignup()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(email,password);
         signup(email, password)
    }
  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input 
      type="text"
      onChange={(e)=>setEmail(e.target.value)}
      value={email} />

<label>Password:</label>
      <input 
      type="text"
      onChange={(e)=>setPassword(e.target.value)}
      value={password} />
      <button disabled={isLoading}>submit</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup
