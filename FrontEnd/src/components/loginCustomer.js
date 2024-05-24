import "./login.css"
import {useState } from "react"
import Toast  from "./toast"
import { postToBackend } from "../utils/backendCalls.js"
import {saveToken } from "../utils/localstorage.js"
import { useNavigate } from "react-router-dom"
import { Container, Spinner} from "react-bootstrap"
import { token } from "../utils/config.js"
import logo from "../assets/logo-color1.png"

const LoginCustomerForm = () => {
   const [loginDetails, setloginDetails] = useState({"email": "", "password": ""})
   const [message, setMessage] = useState(" ")
   const [show, togleShow] = useState(false)
   const [startSpiner, setSpiner] = useState(false)
   const [submitted, setSubmitted] = useState(false)
   const redirect = useNavigate()

   const setValue = (name, value) => {
      loginDetails[name] = value
      setloginDetails({...loginDetails})
   }
   const hidden = () => {togleShow(false)}
  return (
  <Container className="mx-auto d-flex h-100 justify-content-center my-3">
        <form className="registration p-5" onSubmit={async (e) =>{
          e.preventDefault()
          togleShow(false)
          //disable button
          setSpiner(true)
          setSubmitted(true)
          let result = await postToBackend("/auth/login/user", loginDetails)
          //post data login datat to backend
          if(result.status !== 200) {
            setMessage(result.data.message)
          } else {
            setMessage("success")
            //save token
            saveToken(token.customerTokenKey, result.data.token)
            //redirect to Lecturer dashboard
            redirect("/customer/feed")
          }
          togleShow(true)
          setSubmitted(false)
          setSpiner(false)

        }}>
          <section className='w-100 d-flex justify-content-center align-items-center my-2'>
          <img  className="my-1" src={logo} alt="" width="100" height="100" />
          </section>

          <h4 className="h3 text-center mb-3 fw-normal my-2 notice ">Amalitech File Server</h4>
          <hr />
          <h6>Customer Log In</h6>
          {show && <Toast text={message} hidden={hidden}/> }

          <div className="form-floating" style={{minWidth: "350px"}} >
            <input   type="email" onChange={(val) => {
              setValue("email", val.target.value)
            }} value={loginDetails.email}   required className="form-control" id="LecID" placeholder="someone@something.com" />
            <label for="LecID">Email</label>
          </div>

          <div className="form-floating my-1">
            <input type="password" onChange={(val) => {
                  setValue("password", val.target.value)
            }
            } value={loginDetails.password} required className="form-control" id="password" placeholder="password@example.com" />
            <label for="password">Password</label>
          </div>

        
          <div className="checkbox mb-3 my-1">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <div className="spiner-parent">
          <button disabled={submitted} className="w-100 btn btn-lg btn-color btn-primary" type="submit">Submit</button>
          {(submitted && startSpiner) && <Spinner className="spiner-child" /> }
          </div>

          <button  onClick={(e) => {
              e.preventDefault()
                redirect("/user/request/password-reset", {state: {type:"LECTURER", url: "/auth/login/lecturer"}})
          }} href="http://www.google.com" className="my-2 d-block text-dark text-white fgtp">Forget Password</button>
          <a href="/auth/register/customer" className="my-2 d-block"> Dont have account?</a>
        </form>
</Container>
)
}

export {LoginCustomerForm}