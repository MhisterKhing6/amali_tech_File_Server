import "./login.css"
import {useState} from "react"
import Toast  from "./toast.js"
import { Container, Spinner, Row, Col } from "react-bootstrap"
import { postToBackend } from "../utils/backendCalls.js"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo-color1.png"

const RegisterCustomerForm = () => {
   const [registration, setRegistration] = useState({"name":"", "email":"", "password":"", 
   "cpassword":""})
   const [message, setMessage] = useState(" ")
   const [show, togleShow] = useState(false)
   const [startSpiner, setSpiner] = useState(false)
   const [submitted, setSubmitted] = useState(false)
   const redirect = useNavigate()
   const setValue = (name, value) => {
      registration[name] = value
      setRegistration({...registration})
   }
   const hidden = () => {togleShow(false)}
   const text = "Please Register Customer"
  return (
    <div className="container mx-auto d-flex h-100 justify-content-center my-3">
        <form className="registration p-5" onSubmit={async (e) =>{
          e.preventDefault()
          //disable button
          setSubmitted(true)
          //start spiner
          setSpiner(true)
          //check if passwords match
          if (registration.password !== registration.cpassword) {
            //allert with bad message
            setMessage("Passwords dont match")
            togleShow(true)

          } else {
            //post user data
            let response = await postToBackend("/auth/register/customer", registration)
            if (response.status !== 201) {
              setMessage(response.data.reason)
            } else {
              setMessage("Success")
              togleShow(true)
              setSubmitted(false)
              setSpiner(false)
              //Navigate to login
              redirect("/auth/verify/email", {state: {email:registration.email, verificationId: response.data.verificationId, url:"/auth/login/lecturer"}})
            //redirect
            }
          }
          togleShow(true)
          setSubmitted(false)
          setSpiner(false)
        }}>
          <section className='w-100 d-flex justify-content-center align-items-center my-2'>
          <img  className="my-1" src={logo} alt="" width="100" height="100" />
          </section>
          <h4 className="h3 text-center mb-3 fw-normal my-2 notice"><b>Amalitech File Server</b></h4>
          <hr />
          <h6>Register Customer</h6>
          {show && <Toast text={message} hidden={hidden}/> }

          <div className="form-floating" >
            <input   type="tex" onChange={(val) => {
              setValue("name", val.target.value)
            }} value={registration.name}   required className="form-control" id="name" placeholder="name" />
            <label for="name">Your Name</label>
          </div>

          <div className="form-floating my-1">
            <input type="email" onChange={(val) => {
                  setValue("email", val.target.value)
            }
            } value={registration.email} required className="form-control" id="email" placeholder="name@example.com" />
            <label for="email">Email address</label>
          </div>

         
          <div className="form-floating my-1">
            <input minLength={4} onChange={ val => setValue("password", val.target.value)} type="password" required className="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>

          <div className="form-floating my-1">
            <input minLength={4} onChange={ val => {
              if(registration.password !== val.target.value) {
                val.target.style.color = "red"
              } else {
                val.target.style.color = "black"
                setValue("cpassword", val.target.value);
              }
              }} type="password" className="form-control" id="confirmPassword" placeholder="confirm Password" />
            <label for="confirmPassword">Confirm Password</label>
          </div>

          <div className="checkbox mb-3 my-1">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <div className="spiner-parent">
          <button disabled={submitted} className="w-100 btn btn-lg btn-color text-white" type="submit">Submit</button>
          {(submitted && startSpiner) && <Spinner className="spiner-child" /> }
          </div>

          <a href="/auth/login/lecturer" className="my-2 d-block">Already have an account?</a>
          <p className="mt-5 mb-3 text-muted">&copy; Amalitech File Server 2023–2024</p>
        </form>
        </div>
)
}

export {RegisterCustomerForm}