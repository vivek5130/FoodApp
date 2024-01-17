import { useState } from "react";
import { useNavigate } from "react-router-dom" //to redirect to different page
// import { useAuthContext } from "./useAuthContext";
export const useSignup=()=>{
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(null)
    // const [profileResponse,setProfileResponse] = useState(false)
    let profileResponse = false;
    // const {dispatch} = useAuthContext()
    const signup = async(name , email, password,confirmPassword, role) =>{
        setisLoading(true)
        setError(null)
        //posting the user data in db
        const response = await fetch('http://localhost:4000/user/signup',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({name, email, password,confirmPassword,role})
        })
        const json = await response.json()
        //if response is not ok then throw error
        if(!response.ok){
            setisLoading(false)
            setError(json.error)
            console.log(error)
        }
        //if resoponse is ok then save credentials to local storage and redirect to login by updating the authcontext
        if(response.ok){
            //saving the user to local storage because on refreshing the page we should show the content according to the previously loged in user present in local storage
            // localStorage.setItem('user', JSON.stringify(json))
            // dispatch({type:'LOGIN', payload : json})
            console.log(response)
            setisLoading(false)
            setError(null)
            localStorage.setItem('userEmail', email);
            profileResponse = confirm("Are you sure you want to do that?"); //changed
            // setProfileResponse(pResponse)

            console.log(profileResponse);
            console.log("email is",email)
            if(!profileResponse){
                
                navigate('/login')
            }
        }

    }
    return  {signup , isLoading, error,profileResponse}
}