import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=> {

    const goto = useNavigate(null)

    const [Name , setName] = useState()
    const [Email,setEmail] = useState()
    const [Pass,setPass] = useState()


    const handleRegister = () => {
        fetch('/api/register',{
            method:"POST",
            body:JSON.stringify(
                {
                    username:Name,
                    email:Email,
                    password:Pass
                }
            ),
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.status){
                console.log('successfull')
            }
            else{
                console.log(`error ${res.message}`)
            }
        })
    }


    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e)=>setPass(e.target.value)}
                />
              </div>
            </fieldset>
            <div className="" style={{'display':'flex','flexDirection':'column'}}>
              <input
                onClick={handleRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
              <input
                onClick={()=>{goto('/signin')}}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign In"
              />
            </div>
          </div>
        </main>
      </article>
    )
}


export default Register