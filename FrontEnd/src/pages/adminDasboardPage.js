/** protected route */
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { Navigate} from "react-router-dom"
import { UserProfile } from "../components/userProfile.js"
import { AdminNavBar } from "../components/navBaradmin.js"
import { AdminDashboard } from "../components/dashboard.js"
import { getFromBackend } from "../utils/backendCalls.js"
import { useState, useEffect } from "react"

const loadCustomerInfo = async (setState) => {
  let customerInfo = await getFromBackend("/user/me", getToken(token.adminTokenKey))
  if(customerInfo.status === 200)
      setState(customerInfo.data)
}



const AdminDashboardPage = () => {
  let [customerInfo, setCustomerInfo] = useState({})

    useEffect(() => {
      loadCustomerInfo(setCustomerInfo)
    })
    const authenticated = getToken(token.adminTokenKey)
    
    if(!authenticated) {
        return <Navigate to="/admin/login" />
    } else { 
      return  (
      <>
      <div style={{minHeight: "25vh"}} className="my-0">
      <AdminNavBar />
        <UserProfile  name={customerInfo.name} type="admin"/>
      </div>
      <div style={{minHeight: "65vh"}} className="my-0">
      <AdminDashboard />
      </div>
      </>
      )
      }
}

export {AdminDashboardPage}