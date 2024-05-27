/** protected route */
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
import { Navigate} from "react-router-dom"
import { UserProfile } from "../components/userProfile.js"
import { AdminNavBar } from "../components/navBaradmin.js"
import { FilesStats } from "../components/viewTable.js"
import { getFromBackend } from "../utils/backendCalls.js"
import { useEffect, useState } from 'react';
import { SpinerGrow } from "../components/spinerGrow.js"
const loadFiles = async (setFiles, setLoaded, setState) => {
try{
  let response = await getFromBackend("/admin/view-stats", getToken(token.adminTokenKey))
  if(response.status  === 200)
    setFiles(response.data)
  else{
    alert(response.data.message)
  }
  let customerInfo = await getFromBackend("/user/me", getToken(token.adminTokenKey))
  if(customerInfo.status === 200)
      setState(customerInfo.data)
}catch(err){
  console.log(err)
  alert("couldnt upload files")
}
setLoaded(false)
}

const FileStatsPage = () => {
  const [files, setFiles] = useState([])
  const [loadingState, setLoadingState] = useState(true)
  let [customerInfo, setCustomerInfo] = useState({})


  useEffect(() => {
    loadFiles(setFiles, setLoadingState, setCustomerInfo)
  }, [])
    const authenticated = getToken(token.adminTokenKey)
    
    if(!authenticated) {
        return <Navigate to="/admin/login" />
    } else {
      return  (
      <>
      <div style={{minHeight: "25vh"}} className="my-0">
      <AdminNavBar />
        <UserProfile name={customerInfo.name} />
      </div>
      <div style={{minHeight: "65vh"}} className="my-0 container mx-auto">
      {loadingState && <SpinerGrow text="Loading files " />}
      {!loadingState && <FilesStats files={files} /> }
      </div>
      </>
      )
      }
}

export {FileStatsPage}