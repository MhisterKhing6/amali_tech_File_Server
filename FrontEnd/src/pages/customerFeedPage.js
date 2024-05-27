/** protected route */
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { Navigate} from "react-router-dom"
import { UserProfile } from "../components/userProfile.js"
import { CustomerFeed } from "../components/Customerfeed.js"
import { useEffect, useState } from "react"
import { getFromBackend } from "../utils/backendCalls.js"

const loadCustomerInfo = async (setState) => {
    let customerInfo = await getFromBackend("/user/me", getToken(token.customerTokenKey))
    if(customerInfo.status === 200)
        setState(customerInfo.data)
}

const CustomerFeedPage = () => {
  let [customerInfo, setCustomerInfo] = useState({})

    useEffect(() => {
      loadCustomerInfo(setCustomerInfo)
    })
    const authenticated = getToken(token.customerTokenKey)
    
   if(!authenticated) {
        return <Navigate to="/auth/login/customer" />
    } else { 
      return  (
      <>
      <div style={{minHeight: "10vh"}} className="my-0">
        <UserProfile  name={customerInfo.name}/>
      </div>
      <div style={{minHeight: "65vh"}}>
        <CustomerFeed />
      </div>
      </>
      )
   } 
}

export {CustomerFeedPage}