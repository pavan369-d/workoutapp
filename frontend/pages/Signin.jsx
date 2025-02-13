import React, { useState } from 'react'

import { useSignin } from '../hooks/useSignin';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signin,  isLoading,error} = useSignin()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(email,password);
        await signin(email,password);
    }
  return (
    <form className='signin' onSubmit={handleSubmit}>
      <h3>Login</h3>

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

export default Signin
