/** protected route */
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { Navigate} from "react-router-dom"
import { UserProfile } from "../components/userProfile.js"
import { CustomerNavBar } from "../components/searchNavbar.js"
import { FileItem, ListFile } from "../components/listFile.js"
const CustomerFeedPage = () => {
    const authenticated = getToken(token.adminTokenKey)
    
   /* if(!authenticated) {
        return <Navigate to="/admin/login" />
    } else { */
      return  (
      <>
      <div style={{minHeight: "25vh"}} className="my-0">
      <CustomerNavBar />
        <UserProfile />
      </div>
      <div style={{minHeight: "65vh"}} className="my-0 container mx-auto">
        <FileItem />
      </div>
      </>
      )
     /* } */
}

export {CustomerFeedPage}