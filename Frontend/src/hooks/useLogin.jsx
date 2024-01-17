import {useState} from 'react'
import {useAuthContext} from './useAuthContext';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies()
export const useLogin=()=>{
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(null)

    const {dispatch} = useAuthContext()
    const login = async (email, password)=>{
        setisLoading(true)
        setError(false)
        try{
        const response = await fetch('http://localhost:4000/user/login',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email,password}),
            // changed
            credentials: 'include'
        })  
        const json = await response.json()
        let data = null;
        if(json){
            data = json.data
        }
        if(!response.ok){
            setisLoading(false)
            setError(json.error)
            console.log("Response is not ok",error)
        }
        if(response.ok){
            if(data){
                
                localStorage.setItem('user',JSON.stringify(json))
                dispatch({type: 'LOGIN', payload: json})
                setisLoading(false)
                console.log("Logged in", response)
                // const mycookie = cookies.get('login')
                // console.log("cookie is: ",mycookie)
            }
            else{
                console.log(json.message)
                setisLoading(false);
            setError(json.message)
            }   
        }
        else{
            setisLoading(false);
            setError('response is not ok')
        }
    }catch(err){
        setisLoading(false); // Corrected to boolean
      setError('An error occurred while logging in.');
        console.log("Error during login:", err)
    }
       
    }
    return {login,isLoading, error}

}