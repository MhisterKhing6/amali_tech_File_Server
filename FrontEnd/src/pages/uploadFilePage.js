/** protected route */
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { Navigate} from "react-router-dom"
import { UserProfile } from "../components/userProfile.js"
import { AdminNavBar } from "../components/navBaradmin.js"
import { UploadFileForm } from "../components/uploadFileForm.js"
const UploadFilePage = () => {
    const authenticated = getToken(token.adminTokenKey)
    
    if(!authenticated) {
        return <Navigate to="/admin/login" />
    } else {
      return  (
      <>
      <div style={{minHeight: "25vh"}} className="my-0">
      <AdminNavBar />
        <UserProfile />
      </div>
      <div style={{minHeight: "65vh"}} className="my-0 container mx-auto">
      <UploadFileForm />
      </div>
      </>
      )
      }
}

export {UploadFilePage}