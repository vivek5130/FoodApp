import { useState} from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"
const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    // const [isLoading,setisLoading] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async  (e)=>{
        //prevent def is for preventing from refreshing the page on submiting 
        console.log("submitting: ",email, password)
        e.preventDefault()
        await login(email, password)
    }

    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email: </label>
            <input
                type = "email" onChange={(e)=>setEmail(e.target.value)} value = {email} required
            />
            <label>Password: </label>
            <input 
                type = "password" onChange={(e)=>setPassword(e.target.value)} value = {password} required
            />
            <button type="submit">Login</button>
            <Link to = "/forgotPassword"><span>Forgot Password?</span></Link>
            {error && <div className = "errror">{error}</div>}
        </form>
    )
}
export default Login