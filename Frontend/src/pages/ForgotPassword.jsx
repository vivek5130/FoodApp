import React, { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const sendEmail = async(e)=>{
        e.preventDefault();
        console.log("in sendEmail")
        try{
            console.log(email);
            let response = await fetch('http://localhost:4000/user/forgetpassword',{
            method: 'POST',
            body: JSON.stringify({ email }),
            
            // body: JSON.stringify(email),
            headers: {
              'Content-Type': 'application/json'
            //   'Authorization':`Bearer ${user.token}`
            }
        })
        if(response.ok){
            console.log("send email response is ok", response)

        }
        if(!response.ok){
            console.log("send email response is not ok", response)
        }
    }
    catch(error){
        console.log("Error while sending email", error)
        console.log()
    }
    }
  return (
    <div>
      <h3>Enter your email to send your password to it if exists</h3>
      <form onSubmit={sendEmail}>
        <label>Enter email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} required/>
        <button>submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword
