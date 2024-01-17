import { useState } from "react"
import { useSignup } from "../hooks/useSignUp"
import { Link } from "react-router-dom"

const Signup = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setSelectedValue] = useState('user');
  const {signup, error, isLoading,profileResponse} = useSignup()
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password, confirmPassword,role)
   
  }
 
  return (
    <div>
      {/* bug */}
      {/* later make this link only accessable when profileResoponse is true */}
    
    {!profileResponse && 
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      {/* adding profile photo */}
      {/* <input type="file" id="photoInput" name="profilePhoto" accept="image/*" required/>
          <button type="button" onClick={uploadPhoto}>Upload</button> */}
          {/* <label>Click below to upload profile photo</label>
          <Link to ="http://localhost:4000/user/ProfileImage"><span>Upload</span></Link> */}
      <label>Name: </label>
      <input
        type = 'text'
        onChange={(e)=>setName(e.target.value)}
        value = {name} required 
        />
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}  required 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password}  required 
      />
      {/* <input type="file" id="myFile" name="filename"></input> */}
      <label>Confirm Password: </label>
      <input
        type="password"
        onChange={(e)=>setConfirmPassword(e.target.value)}
        value = {confirmPassword} required 
        />



        <p>Please select your Role:</p>
        <input type="radio" id="user" name="role" value=  "user" checked={role === 'user'}
          onChange={handleRadioChange} />
        <label htmlFor="user">user</label>
        <input type="radio" id="deliveryBoy" name="role" value="deliveryBoy" checked={role === 'deliveryBoy'}
          onChange={handleRadioChange}/>
        <label htmlFor="deliveryBoy">deliveryBoy</label>
        <input type="radio" id="admin" name="role" value="admin" checked={role === 'admin'}
          onChange={handleRadioChange}/>
        <label htmlFor="admin">admin</label>
        <input type="radio" id="restaurentOwner" name="role" value="restaurentOwner" checked={role === 'restaurentOwner'}
          onChange={handleRadioChange}/>
        <label htmlFor="restaurentOwner">restaurentOwner</label>

{<div> <label>Click below to upload profile photo</label>
    <a href={`http://localhost:4000/user/ProfileImage/${email}`}><span>Upload</span></a>  
    </div> }

      {error && <div className="error">{error}</div>}
      <button disabled={isLoading} type = "submit">Sign up</button>
    </form> 
}
    </div>
  )
}

export default Signup