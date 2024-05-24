import { NewPasswordForm } from "../components/newPasswordForm"
import { useLocation } from "react-router-dom"
const NewPassworPage = () => {
    let loc = useLocation()
    if(loc.state)
        return  <NewPasswordForm verificationId = {loc.state.verificationId} />
}

export {NewPassworPage}