import { Container, Dropdown } from "react-bootstrap"
import avatar from "../assets/prfileAvatar.png"
import { getToken, logout } from "../utils/localstorage"
import { token } from "../utils/config"
import {useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getFromBackend } from "../utils/backendCalls"



const UserProfile = ({type, name}) => {
    
    let redirect = useNavigate()
    return (
        <Container fluid className="d-flex px-1 w-100 justify-content-end align-items-center h-auto userProfile mb-0 m-0">
                <Dropdown className="p-1">
                    <Dropdown.Toggle id="dropdown-basic" className="avatar d-flex justify-content-center align-items-center">
                        <p className="mt-2 mx-1 lead">{name}</p>
                        <img src={avatar} style={{width:"50px", height:"50px"}} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(val) => {
                            val.preventDefault()
                            console.log(type)
                            if(type){
                                logout(token.adminTokenKey)
                                redirect("/admin/login")
                            }else {
                                logout(token.customerTokenKey)
                                redirect("/auth/login/customer")
                            }
                        }} href="#/action-1">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        </Container>
    )
}

export {UserProfile}